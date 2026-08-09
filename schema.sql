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
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
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
    code VARCHAR(10) UNIQUE NOT NULL,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
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
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
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
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status progress_status DEFAULT 'not_started',
    score NUMERIC(5,2) DEFAULT 0.00,
    completion_time_seconds INTEGER DEFAULT 0,
    feedback TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, student_id)
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
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
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
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON public.classes(teacher_id);
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
  );
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

-- 7. RLS POLICIES

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by authenticated users"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- CLASSES POLICIES
CREATE POLICY "Classes are viewable by members or teachers"
    ON public.classes FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Teachers & Admins can create classes"
    ON public.classes FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('teacher', 'admin')
        )
    );

CREATE POLICY "Teachers can update their classes"
    ON public.classes FOR UPDATE
    TO authenticated
    USING (teacher_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- CLASS MEMBERS POLICIES
CREATE POLICY "Class members viewable by class participants"
    ON public.class_members FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Students can join class using code"
    ON public.class_members FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    ));

-- MATERIALS POLICIES
CREATE POLICY "Materials viewable if public or author"
    ON public.materials FOR SELECT
    TO authenticated
    USING (is_public = true OR author_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY "Teachers and Admins can insert materials"
    ON public.materials FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('teacher', 'admin')
        )
    );

-- ASSIGNMENTS POLICIES
CREATE POLICY "Assignments viewable by authenticated users"
    ON public.assignments FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Teachers can create assignments"
    ON public.assignments FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('teacher', 'admin')
        )
    );

-- STUDENT PROGRESS POLICIES
CREATE POLICY "Progress viewable by student, teacher or admin"
    ON public.student_progress FOR SELECT
    TO authenticated
    USING (student_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    ));

CREATE POLICY "Students can create/update their own progress"
    ON public.student_progress FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their progress"
    ON public.student_progress FOR UPDATE
    TO authenticated
    USING (student_id = auth.uid());

-- QUESTION BANK POLICIES
CREATE POLICY "Question bank viewable by all users"
    ON public.question_bank FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Teachers and Admins can create questions"
    ON public.question_bank FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('teacher', 'admin')
        )
    );

-- AI RECOMMENDATIONS POLICIES
CREATE POLICY "AI Recommendations viewable by targeted student or teacher"
    ON public.ai_recommendations FOR SELECT
    TO authenticated
    USING (student_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    ));

CREATE POLICY "System/User can manage AI Recommendations"
    ON public.ai_recommendations FOR ALL
    TO authenticated
    USING (true);

-- 8. INITIAL SEED DATA (Trường TH Lê Văn Tám - Lớp 5/4)
-- Note: Replace demo UUIDs when connecting with actual Supabase Auth IDs
