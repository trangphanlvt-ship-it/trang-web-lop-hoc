-- ==============================================================================
-- TRƯỜNG TIỂU HỌC LÊ VĂN TÁM - LỚP 5/4 (NĂM HỌC 2025-2026)
-- GVCN: PHAN THỊ DIỄM TRANG - ĐỊA CHỈ: S15 ĐƯỜNG TÂN PHÚ, PHƯỜNG TÂN MỸ, TP. HCM
-- SUPABASE POSTGRESQL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE material_type AS ENUM ('document', 'video', 'game_iframe', 'game_html5', 'quiz_custom');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subject_code AS ENUM (
        'TOAN', 
        'TIENG_VIET', 
        'KHOA_HOC', 
        'LICH_SU_DIA_LY', 
        'CONG_NGHE', 
        'DAO_DUC', 
        'HOAT_DONG_TRAI_NGHIEM'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLES DEFINITION

-- PROFILES (Users Profile sync with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    student_code TEXT UNIQUE,
    stars_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLASSES (Quản lý lớp học)
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    code VARCHAR(20) UNIQUE NOT NULL,
    teacher_name TEXT NOT NULL DEFAULT 'PHAN THỊ DIỄM TRANG',
    school_year TEXT NOT NULL DEFAULT '2025-2026',
    grade_level INTEGER NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLASS_MEMBERS (Danh sách thành viên lớp học)
CREATE TABLE IF NOT EXISTS public.class_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, student_id)
);

-- MATERIALS (Kho học liệu & Trò chơi tương tác)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    subject subject_code NOT NULL,
    file_url TEXT,
    type material_type NOT NULL DEFAULT 'quiz_custom',
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ASSIGNMENTS (Giao bài tập & trò chơi cho lớp)
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    due_date TIMESTAMPTZ,
    points_possible INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STUDENT_PROGRESS (Theo dõi tiến độ & Báo cáo kết quả)
CREATE TABLE IF NOT EXISTS public.student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status progress_status DEFAULT 'not_started',
    score NUMERIC(5,2) DEFAULT 0.00,
    completion_time_seconds INTEGER DEFAULT 0,
    feedback TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUESTION_BANK (Ngân hàng câu hỏi SGK Lớp 5)
CREATE TABLE IF NOT EXISTS public.question_bank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject subject_code NOT NULL,
    topic TEXT NOT NULL,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of choices e.g. ["A", "B", "C", "D"]
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    difficulty TEXT DEFAULT 'medium',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI_RECOMMENDATIONS (Trợ lý AI gợi ý nhiệm vụ cá nhân hóa)
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject subject_code NOT NULL,
    task_title TEXT NOT NULL,
    description TEXT NOT NULL,
    status progress_status DEFAULT 'not_started',
    score_achieved NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_class_members_class ON public.class_members(class_id);
CREATE INDEX IF NOT EXISTS idx_class_members_student ON public.class_members(student_id);
CREATE INDEX IF NOT EXISTS idx_materials_subject ON public.materials(subject);
CREATE INDEX IF NOT EXISTS idx_assignments_class ON public.assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_student ON public.student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_subject ON public.question_bank(subject);

-- 5. TRIGGER ON AUTH.USERS TO CREATE PROFILE AUTOMATICALLY
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, avatar_url, date_of_birth)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'),
    CASE 
      WHEN NEW.raw_user_meta_data->>'date_of_birth' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'date_of_birth')::DATE 
      ELSE NULL 
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES (Allow Public/Anon & Authenticated Read for Classroom UI)

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Profiles viewable by all" ON public.profiles;
CREATE POLICY "Profiles viewable by all" ON public.profiles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Profiles editable by owner or admin" ON public.profiles;
CREATE POLICY "Profiles editable by owner or admin" ON public.profiles FOR ALL TO anon, authenticated USING (true);

-- CLASSES POLICIES
DROP POLICY IF EXISTS "Classes viewable by all" ON public.classes;
CREATE POLICY "Classes viewable by all" ON public.classes FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Classes insertable" ON public.classes;
CREATE POLICY "Classes insertable" ON public.classes FOR ALL TO anon, authenticated USING (true);

-- MATERIALS POLICIES
DROP POLICY IF EXISTS "Materials viewable by all" ON public.materials;
CREATE POLICY "Materials viewable by all" ON public.materials FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Materials editable" ON public.materials;
CREATE POLICY "Materials editable" ON public.materials FOR ALL TO anon, authenticated USING (true);

-- QUESTION BANK POLICIES
DROP POLICY IF EXISTS "Question bank viewable by all" ON public.question_bank;
CREATE POLICY "Question bank viewable by all" ON public.question_bank FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Question bank insertable" ON public.question_bank;
CREATE POLICY "Question bank insertable" ON public.question_bank FOR ALL TO anon, authenticated USING (true);

-- STUDENT PROGRESS POLICIES
DROP POLICY IF EXISTS "Student progress viewable by all" ON public.student_progress;
CREATE POLICY "Student progress viewable by all" ON public.student_progress FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Student progress insertable" ON public.student_progress;
CREATE POLICY "Student progress insertable" ON public.student_progress FOR ALL TO anon, authenticated USING (true);

-- AI RECOMMENDATIONS POLICIES
DROP POLICY IF EXISTS "AI recommendations viewable by all" ON public.ai_recommendations;
CREATE POLICY "AI recommendations viewable by all" ON public.ai_recommendations FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "AI recommendations insertable" ON public.ai_recommendations;
CREATE POLICY "AI recommendations insertable" ON public.ai_recommendations FOR ALL TO anon, authenticated USING (true);


-- 8. INITIAL SEED DATA (Trường TH Lê Văn Tám - Lớp 5/4)

-- Class 5/4 record
INSERT INTO public.classes (name, description, code, teacher_name, school_year, grade_level)
VALUES (
  'Lớp 5/4',
  'Lớp 5/4 Trường Tiểu học Lê Văn Tám - Năm học 2025-2026. GVCN Phan Thị Diễm Trang.',
  'LVT-54-2025',
  'PHAN THỊ DIỄM TRANG',
  '2025-2026',
  5
) ON CONFLICT (code) DO NOTHING;

-- Question Bank Initial Seed (SGK Lớp 5 2025-2026)
INSERT INTO public.question_bank (subject, topic, question_text, options, correct_answer, explanation, difficulty)
VALUES
-- TOÁN
('TOAN', 'Số thập phân', 'Số thập phân gồm 5 đơn vị, 3 phần mười và 8 phần trăm được viết là:', '["5,38", "5,83", "53,8", "538"]', '5,38', '5 đơn vị = 5; 3 phần mười = 0,3; 8 phần trăm = 0,08. Vậy số đó là 5 + 0,3 + 0,08 = 5,38.', 'easy'),
('TOAN', 'Tỉ số phần trăm', 'Lớp 5/4 có 38 học sinh, trong đó có 19 bạn nữ. Tỉ số phần trăm học sinh nữ so với cả lớp là:', '["25%", "50%", "75%", "40%"]', '50%', 'Tỉ số phần trăm nữ = (19 / 38) x 100% = 50%.', 'medium'),
('TOAN', 'Hình học', 'Diện tích hình tam giác có độ dài đáy 12cm và chiều cao 8cm là:', '["48 cm²", "96 cm²", "20 cm²", "40 cm²"]', '48 cm²', 'Diện tích tam giác = (Đáy x Chiều cao) / 2 = (12 x 8) / 2 = 48 cm².', 'easy'),

-- TIẾNG VIỆT
('TIENG_VIET', 'Luyện từ và câu', 'Từ nào sau đây ĐỒNG NGHĨA với từ "Hòa bình"?', '["Thái bình", "Chiến tranh", "Ồn ào", "Hỗn loạn"]', 'Thái bình', 'Thái bình có nghĩa là cảnh trạng yên ổn, không có chiến tranh xung đột.', 'easy'),
('TIENG_VIET', 'Luyện từ và câu', 'Trong câu "Thành phố Hồ Chí Minh là trung tâm kinh tế lớn", đại từ "Thành phố Hồ Chí Minh" đóng vai trò là:', '["Chủ ngữ", "Vị ngữ", "Trạng ngữ", "Bổ ngữ"]', 'Chủ ngữ', '"Thành phố Hồ Chí Minh" chỉ đối tượng được thuyết minh trong câu, giữ chức vụ Chủ ngữ.', 'medium'),

-- KHOA HỌC
('KHOA_HOC', 'Sự biến đổi của chất', 'Hiện tượng nào sau đây là sự biến đổi hóa học?', '["Đinh sắt bị gỉ", "Nước đá tan thành nước", "Hòa tan đường vào nước", "Xé nhỏ tờ giấy"]', 'Đinh sắt bị gỉ', 'Khi sắt bị gỉ, chất mới (gỉ sắt - oxit sắt) được tạo thành, đây là sự biến đổi hóa học.', 'medium'),
('KHOA_HOC', 'Năng lượng', 'Năng lượng mặt trời cung cấp cho Trái Đất dạng năng lượng nào?', '["Nhiệt năng và quang năng", "Điện năng và cơ năng", "Hóa năng và nguyên tử", "Cơ năng và âm thanh"]', 'Nhiệt năng và quang năng', 'Mặt Trời chiếu sáng (quang năng) và sưởi ấm Trái Đất (nhiệt năng).', 'easy'),

-- LỊCH SỬ VÀ ĐỊA LÝ
('LICH_SU_DIA_LY', 'Lịch sử Việt Nam', 'Bác Hồ đọc Bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa vào ngày tháng năm nào?', '["02/09/1945", "19/08/1945", "30/04/1975", "07/05/1954"]', '02/09/1945', 'Ngày 2 tháng 9 năm 1945, tại quảng trường Ba Đình, Hà Nội, Bác Hồ đã đọc Bản Tuyên ngôn Độc lập.', 'easy'),
('LICH_SU_DIA_LY', 'Địa lý Việt Nam', 'Đồng bằng nào có diện tích lớn nhất Việt Nam?', '["Đồng bằng sông Cửu Long", "Đồng bằng sông Hồng", "Đồng bằng duyên hải Miền Trung", "Đồng bằng Bắc Bộ"]', 'Đồng bằng sông Cửu Long', 'Đồng bằng sông Cửu Long là vùng đồng bằng châu thổ rộng lớn nhất cả nước.', 'easy'),

-- CÔNG NGHỆ
('CONG_NGHE', 'An toàn Internet', 'Hành động nào thể hiện việc sử dụng Internet an toàn và có trách nhiệm?', '["Không chia sẻ mật khẩu cá nhân cho người lạ", "Đăng thông tin cá nhân của bạn bè", "Kết bạn với người không quen", "Tải ứng dụng từ nguồn lạ"]', 'Không chia sẻ mật khẩu cá nhân cho người lạ', 'Bảo vệ mật khẩu giúp phòng tránh bị mất tài khoản và rò rỉ thông tin riêng tư.', 'easy'),

-- ĐẠO ĐỨC
('DAO_DUC', 'Lòng biết ơn', 'Câu ca dao "Ăn quả nhớ kẻ trồng cây" khuyên dạy chúng ta bài học đạo đức gì?', '["Biết ơn những người giúp đỡ ta", "Cần kiệm trong sinh hoạt", "Giữ gìn vệ sinh trường lớp", "Tích cực tập thể thao"]', 'Biết ơn những người giúp đỡ ta', 'Câu ca dao thể hiện truyền thống uống nước nhớ nguồn, lòng biết ơn sâu sắc.', 'easy'),

-- HOẠT ĐỘNG TRẢI NGHIỆM
('HOAT_DONG_TRAI_NGHIEM', 'Tình bạn', 'Khi thấy bạn trong lớp gặp khó khăn trong bài tập Toán, em nên làm gì?', '["Hướng dẫn và giảng lại bài cho bạn hiểu", "Cho bạn chép bài để nộp cho xong", "Báo cô giáo phạt bạn", "Bỏ qua không quan tâm"]', 'Hướng dẫn và giảng lại bài cho bạn hiểu', 'Giúp bạn tự hiểu bài mới là cách hỗ trợ bạn tiến bộ chân thành nhất.', 'easy');

-- Sample Materials (Game iFrame & Quiz)
INSERT INTO public.materials (title, description, subject, file_url, type, is_public)
VALUES
('Game Ôn Tập Toán 5 - Số Thập Phân', 'Trò chơi trắc nghiệm tính nhanh số thập phân SGK Lớp 5.', 'TOAN', 'https://wordwall.net/embed/4060b299e4f54e15b57f2081d4b68453', 'game_iframe', true),
('Ghép Từ Tiếng Việt Lớp 5', 'Game ghép từ đồng nghĩa và từ trái nghĩa.', 'TIENG_VIET', 'https://wordwall.net/embed/4060b299e4f54e15b57f2081d4b68453', 'game_iframe', true),
('Thí Nghiệm Khoa Học Vui', 'Khám phá sự biến đổi của chất và năng lượng.', 'KHOA_HOC', 'https://wordwall.net/embed/4060b299e4f54e15b57f2081d4b68453', 'game_iframe', true);
