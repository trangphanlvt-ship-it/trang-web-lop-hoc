// DỮ LIỆU CHƯƠNG TRÌNH SGK LỚP 5 (2025-2026) - TRƯỜNG TH LÊ VĂN TÁM, LỚP 5/4
// GVCN: PHAN THỊ DIỄM TRANG

export const SCHOOL_INFO = {
  name: "Trường Tiểu học Lê Văn Tám",
  className: "Lớp 5/4",
  schoolYear: "2025 - 2026",
  teacherName: "PHAN THỊ DIỄM TRANG",
  address: "S15 đường Tân Phú, phường Tân Mỹ, Thành phố Hồ Chí Minh",
  totalStudents: 38,
  motto: "Lớp 5/4: Chăm ngoan - Sáng tạo - Tự tin - Đoàn kết",
};

export const SUBJECTS_LIST = [
  {
    id: "TOAN",
    name: "TOÁN",
    code: "TOAN",
    icon: "Calculator",
    color: "from-blue-600 to-indigo-700",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Số thập phân, Tỉ số phần trăm, Hình học không gian & Giải toán thực tế SGK Lớp 5.",
    lessonsCount: 15,
    gamesCount: 8,
    bgPattern: "bg-blue-50",
  },
  {
    id: "TIENG_VIET",
    name: "TIẾNG VIỆT",
    code: "TIENG_VIET",
    icon: "BookOpen",
    color: "from-rose-600 to-pink-700",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    description: "Luyện từ và câu, Tập làm văn, Đọc hiểu tác phẩm văn học & Từ ngữ Việt Nam.",
    lessonsCount: 18,
    gamesCount: 10,
    bgPattern: "bg-rose-50",
  },
  {
    id: "KHOA_HOC",
    name: "KHOA HỌC",
    code: "KHOA_HOC",
    icon: "FlaskConical",
    color: "from-emerald-600 to-teal-700",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Sự biến đổi của chất, Khám phá năng lượng, Cơ thể người & Bảo vệ môi trường.",
    lessonsCount: 12,
    gamesCount: 6,
    bgPattern: "bg-emerald-50",
  },
  {
    id: "LICH_SU_DIA_LY",
    name: "LỊCH SỬ VÀ ĐỊA LÝ",
    code: "LICH_SU_DIA_LY",
    icon: "Compass",
    color: "from-amber-600 to-orange-700",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    description: "Địa lý Việt Nam & Thế giới, Lịch sử dựng nước, giữ nước hào hùng của Dân tộc.",
    lessonsCount: 14,
    gamesCount: 7,
    bgPattern: "bg-amber-50",
  },
  {
    id: "CONG_NGHE",
    name: "CÔNG NGHỆ",
    code: "CONG_NGHE",
    icon: "Cpu",
    color: "from-purple-600 to-violet-700",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    description: "Sử dụng công nghệ an toàn, Thiết kế kỹ thuật số & Tin học tiểu học.",
    lessonsCount: 10,
    gamesCount: 5,
    bgPattern: "bg-purple-50",
  },
  {
    id: "DAO_DUC",
    name: "ĐẠO ĐỨC",
    code: "DAO_DUC",
    icon: "Heart",
    color: "from-red-600 to-rose-700",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    description: "Lòng biết ơn, Xử lý tình huống văn minh, Yêu thương gia đình & Trách nhiệm.",
    lessonsCount: 10,
    gamesCount: 4,
    bgPattern: "bg-red-50",
  },
  {
    id: "HOAT_DONG_TRAI_NGHIEM",
    name: "HOẠT ĐỘNG TRẢI NGHIỆM",
    code: "HOAT_DONG_TRAI_NGHIEM",
    icon: "Sparkles",
    color: "from-cyan-600 to-blue-700",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    description: "Xây dựng tình bạn, Kỹ năng sống, Hoạt động tập thể & Dự án hành động xanh.",
    lessonsCount: 12,
    gamesCount: 5,
    bgPattern: "bg-cyan-50",
  },
];

export const INITIAL_QUESTION_BANK = [
  // TOÁN
  {
    id: "q-toan-1",
    subject: "TOAN",
    topic: "Số thập phân",
    question_text: "Số thập phân gồm 5 đơn vị, 3 phần mười và 8 phần trăm được viết là:",
    options: ["5,38", "5,83", "53,8", "538"],
    correct_answer: "5,38",
    explanation: "5 đơn vị = 5; 3 phần mười = 0,3; 8 phần trăm = 0,08. Vậy số đó là 5 + 0,3 + 0,08 = 5,38.",
    difficulty: "easy",
  },
  {
    id: "q-toan-2",
    subject: "TOAN",
    topic: "Tỉ số phần trăm",
    question_text: "Lớp 5/4 có 38 học sinh, trong đó có 19 bạn nữ. Tỉ số phần trăm học sinh nữ so với cả lớp là:",
    options: ["25%", "50%", "75%", "40%"],
    correct_answer: "50%",
    explanation: "Tỉ số phần trăm nữ = (19 / 38) x 100% = 50%.",
    difficulty: "medium",
  },
  {
    id: "q-toan-3",
    subject: "TOAN",
    topic: "Hình học",
    question_text: "Diện tích hình tam giác có độ dài đáy 12cm và chiều cao 8cm là:",
    options: ["48 cm²", "96 cm²", "20 cm²", "40 cm²"],
    correct_answer: "48 cm²",
    explanation: "Diện tích tam giác = (Đáy x Chiều cao) / 2 = (12 x 8) / 2 = 48 cm².",
    difficulty: "easy",
  },

  // TIẾNG VIỆT
  {
    id: "q-tv-1",
    subject: "TIENG_VIET",
    topic: "Luyện từ và câu",
    question_text: "Từ nào sau đây ĐỒNG NGHĨA với từ 'Hòa bình'?",
    options: ["Thái bình", "Chiến tranh", "Ồn ào", "Hỗn loạn"],
    correct_answer: "Thái bình",
    explanation: "Thái bình có nghĩa là cảnh trạng yên ổn, không có chiến tranh xung đột.",
    difficulty: "easy",
  },
  {
    id: "q-tv-2",
    subject: "TIENG_VIET",
    topic: "Luyện từ và câu",
    question_text: "Trong câu 'Thành phố Hồ Chí Minh là trung tâm kinh tế lớn', đại từ 'Thành phố Hồ Chí Minh' đóng vai trò là:",
    options: ["Chủ ngữ", "Vị ngữ", "Trạng ngữ", "Bổ ngữ"],
    correct_answer: "Chủ ngữ",
    explanation: "'Thành phố Hồ Chí Minh' chỉ đối tượng được thuyết minh trong câu, giữ chức vụ Chủ ngữ.",
    difficulty: "medium",
  },

  // KHOA HỌC
  {
    id: "q-kh-1",
    subject: "KHOA_HOC",
    topic: "Sự biến đổi của chất",
    question_text: "Hiện tượng nào sau đây là sự biến đổi hóa học?",
    options: ["Đinh sắt bị gỉ", "Nước đá tan thành nước", "Hòa tan đường vào nước", "Xé nhỏ tờ giấy"],
    correct_answer: "Đinh sắt bị gỉ",
    explanation: "Khi sắt bị gỉ, chất mới (gỉ sắt - oxit sắt) được tạo thành, đây là sự biến đổi hóa học.",
    difficulty: "medium",
  },
  {
    id: "q-kh-2",
    subject: "KHOA_HOC",
    topic: "Năng lượng",
    question_text: "Năng lượng mặt trời cung cấp cho Trái Đất dạng năng lượng nào?",
    options: ["Nhiệt năng và quang năng", "Điện năng và cơ năng", "Hóa năng và nguyên tử", "Cơ năng và âm thanh"],
    correct_answer: "Nhiệt năng và quang năng",
    explanation: "Mặt Trời chiếu sáng (quang năng) và sưởi ấm Trái Đất (nhiệt năng).",
    difficulty: "easy",
  },

  // LỊCH SỬ VÀ ĐỊA LÝ
  {
    id: "q-lsdl-1",
    subject: "LICH_SU_DIA_LY",
    topic: "Lịch sử Việt Nam",
    question_text: "Bác Hồ đọc Bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa vào ngày tháng năm nào?",
    options: ["02/09/1945", "19/08/1945", "30/04/1975", "07/05/1954"],
    correct_answer: "02/09/1945",
    explanation: "Ngày 2 tháng 9 năm 1945, tại quảng trường Ba Đình, Hà Nội, Bác Hồ đã đọc Bản Tuyên ngôn Độc lập.",
    difficulty: "easy",
  },
  {
    id: "q-lsdl-2",
    subject: "LICH_SU_DIA_LY",
    topic: "Địa lý Việt Nam",
    question_text: "Đồng bằng nào có diện tích lớn nhất Việt Nam?",
    options: ["Đồng bằng sông Cửu Long", "Đồng bằng sông Hồng", "Đồng bằng duyên hải Mãi Trung", "Đồng bằng Bắc Bộ"],
    correct_answer: "Đồng bằng sông Cửu Long",
    explanation: "Đồng bằng sông Cửu Long là vùng đồng bằng châu thổ rộng lớn nhất cả nước.",
    difficulty: "easy",
  },

  // CÔNG NGHỆ
  {
    id: "q-cn-1",
    subject: "CONG_NGHE",
    topic: "An toàn Internet",
    question_text: "Hành động nào thể hiện việc sử dụng Internet an toàn và có trách nhiệm?",
    options: [
      "Không chia sẻ mật khẩu cá nhân cho người lạ",
      "Đăng thông tin cá nhân của bạn bè lên mạng",
      "Kết bạn với người không quen biết trên mạng",
      "Tải ứng dụng từ nguồn không xác định"
    ],
    correct_answer: "Không chia sẻ mật khẩu cá nhân cho người lạ",
    explanation: "Bảo vệ mật khẩu giúp phòng tránh bị mất tài khoản và rò rỉ thông tin riêng tư.",
    difficulty: "easy",
  },

  // ĐẠO ĐỨC
  {
    id: "q-dd-1",
    subject: "DAO_DUC",
    topic: "Lòng biết ơn",
    question_text: "Câu ca dao 'Ăn quả nhớ kẻ trồng cây' khuyên dạy chúng ta bài học đạo đức gì?",
    options: ["Biết ơn những người giúp đỡ ta", "Cần kiệm trong sinh hoạt", "Giữ gìn vệ sinh trường lớp", "Tích cực tập thể thao"],
    correct_answer: "Biết ơn những người giúp đỡ ta",
    explanation: "Câu ca dao thể hiện truyền thống uống nước nhớ nguồn, lòng biết ơn sâu sắc.",
    difficulty: "easy",
  },

  // HOẠT ĐỘNG TRẢI NGHIỆM
  {
    id: "q-hdtn-1",
    subject: "HOAT_DONG_TRAI_NGHIEM",
    topic: "Tình bạn",
    question_text: "Khi thấy bạn trong lớp gặp khó khăn trong bài tập Toán, em nên làm gì?",
    options: [
      "Hướng dẫn và giảng lại bài cho bạn hiểu",
      "Cho bạn chép bài để nộp cho xong",
      "Báo cô giáo phạt bạn",
      "Bỏ qua không quan tâm"
    ],
    correct_answer: "Hướng dẫn và giảng lại bài cho bạn hiểu",
    explanation: "Giúp bạn tự hiểu bài mới là cách hỗ trợ bạn tiến bộ chân thành nhất.",
    difficulty: "easy",
  }
];

export const HO_CHI_MINH_CULTURE_SPACE = {
  title: "Không gian Văn hóa Hồ Chí Minh - Lớp 5/4",
  school: "Trường Tiểu học Lê Văn Tám",
  fiveTeachings: [
    { number: 1, text: "Yêu tổ quốc, yêu đồng bào" },
    { number: 2, text: "Học tập tốt, lao động tốt" },
    { number: 3, text: "Đoàn kết tốt, kỷ luật tốt" },
    { number: 4, text: "Giữ gìn vệ sinh thật tốt" },
    { number: 5, text: "Khiêm tốn, thật thà, dũng cảm" }
  ],
  stories: [
    {
      id: 1,
      title: "Chiếc áo ấm Bác tặng",
      summary: "Câu chuyện cảm động về tình yêu thương vô bờ bến của Bác Hồ dành cho các cháu thiếu niên, nhi đồng.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
      content: "Bác Hồ luôn dành tình cảm ấm áp nhất cho các cháu thiếu nhi. Dù bận trăm công nghìn việc của đất nước, Bác vẫn nhớ mua áo ấm, chia quà bánh và viết thư khen ngợi những em học sinh chăm ngoan."
    },
    {
      id: 2,
      title: "Bác Hồ với phong trào Kế hoạch nhỏ",
      summary: "Lời Bác dạy về tính tiết kiệm, yêu lao động và giúp đỡ bạn nghèo vượt khó.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
      content: "Bác dạy thiếu nhi: 'Tuổi nhỏ làm việc nhỏ, tùy theo sức của mình'. Học sinh Lớp 5/4 tích cực thu gom giấy vụn, trồng cây xanh để góp phần nuôi heo đất giúp bạn vượt khó."
    }
  ]
};

export const CLASS_ROSTER_54 = [
  { id: "hs-01", name: "Nguyễn Văn An", dob: "2015-03-15", gender: "Nam", stars: 45, badge: "Ngôi sao Chăm chỉ" },
  { id: "hs-02", name: "Trần Thị Bảo Anh", dob: "2015-07-20", gender: "Nữ", stars: 50, badge: "Học sinh Xuất sắc" },
  { id: "hs-03", name: "Lê Gia Bảo", dob: "2015-11-02", gender: "Nam", stars: 42, badge: "Vua Toán Học" },
  { id: "hs-04", name: "Phạm Minh Cường", dob: "2015-01-10", gender: "Nam", stars: 38, badge: "Dũng Sĩ Tiếng Việt" },
  { id: "hs-05", name: "Vũ Thùy Dương", dob: "2015-09-05", gender: "Nữ", stars: 48, badge: "Nhà Khoa Học Nhí" },
  { id: "hs-06", name: "Đặng Hoàng Dung", dob: "2015-04-12", gender: "Nữ", stars: 40, badge: "Búp Măng Chăm Ngoan" },
  { id: "hs-07", name: "Ngô Đức Duy", dob: "2015-08-18", gender: "Nam", stars: 36, badge: "Chiến Sĩ Kỹ Thuật" },
  { id: "hs-08", name: "Bùi Mỹ Hạnh", dob: "2015-12-25", gender: "Nữ", stars: 44, badge: "Hoa Khôi Thân Thiện" },
  { id: "hs-09", name: "Hoàng Gia Huy", dob: "2015-02-14", gender: "Nam", stars: 49, badge: "Kỷ Lục Gia Game" },
  { id: "hs-10", name: "Đỗ Mai Khôi", dob: "2015-06-30", gender: "Nữ", stars: 41, badge: "Sao Sáng Đạo Đức" },
  { id: "hs-11", name: "Phan Thị Diễm Trang", dob: "1988-10-15", gender: "Nữ", stars: 999, badge: "Giáo Viên Chủ Nhiệm" }
];

export const TEACHER_REMINDERS = [
  {
    id: "rem-1",
    date: "2026-08-10",
    title: "Chuẩn bị sách vở và đồ dùng học tập Tuần mới",
    content: "Các em học sinh Lớp 5/4 nhớ chuẩn bị đầy đủ SGK Toán, Tiếng Việt Lớp 5 tập 1 và dụng cụ vẽ hình cho tiết Học toán hình học.",
    author: "Cô PHAN THỊ DIỄM TRANG",
    priority: "high"
  },
  {
    id: "rem-2",
    date: "2026-08-12",
    title: "Tham gia Cuộc thi Tương tác Tìm hiểu Bác Hồ",
    content: "Các em truy cập mục 'Không gian Văn hóa Hồ Chí Minh' để tham gia trả lời trắc nghiệm 5 Điều Bác Hồ Dạy tích điểm Ngôi sao nhé!",
    author: "Cô PHAN THỊ DIỄM TRANG",
    priority: "medium"
  },
  {
    id: "rem-3",
    date: "2026-08-15",
    title: "Sinh hoạt Lớp & Bình chọn Sao Chăm Ngoan Tháng 8",
    content: "Thứ Sáu tuần này lớp chúng mình sẽ tổng kết điểm Ngôi sao thi đua và trao phần thưởng cho Top 5 bạn xuất sắc nhất.",
    author: "Cô PHAN THỊ DIỄM TRANG",
    priority: "normal"
  }
];
