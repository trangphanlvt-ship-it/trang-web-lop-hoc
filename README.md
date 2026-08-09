# 🏫 Trường Tiểu Học Lê Văn Tám - Lớp 5/4 (Năm Học 2025 - 2026)
### Hệ Thống Web App Quản Lý Giáo Dục, Kho Học Liệu & Game Tương Tác

![Production Ready](https://img.shields.io/badge/Status-Production--Ready-brightgreen)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20Tailwind-blue)
![Supabase](https://img.shields.io/badge/Backend-Supabase%20PostgreSQL%20%2B%20RLS-emerald)
![Vercel](https://img.shields.io/badge/Deployment-Vercel%20Ready-black)

---

## 📌 THÔNG TIN ĐƠN VỊ & LỚP HỌC
- **Trường**: Trường Tiểu học Lê Văn Tám
- **Lớp**: 5/4
- **Năm học**: 2025 - 2026
- **Giáo viên chủ nhiệm (GVCN)**: **PHAN THỊ DIỄM TRANG**
- **Địa chỉ**: S15 đường Tân Phú, phường Tân Mỹ, Thành phố Hồ Chí Minh.
- **Phương châm Lớp 5/4**: *"Chăm ngoan - Sáng tạo - Tự tin - Đoàn kết"*

---

## 🎨 TIÊU CHUẨN THIẾT KẾ (DESIGN AESTHETICS)
- Giao diện được thiết kế theo phong cách nghệ thuật **Thủy Mặc (Water Ink)** kết hợp đồ họa **Ultra Realistic** sống động, gần gũi với học sinh Tiểu học Việt Nam.
- **Thanh Running Clock Ticker**: Hiển thị thời gian thực theo từng giây nhảy liên tục dưới banner chính (`Chủ Nhật, ngày 09/08/2026 13:48:57`).

---

## 📚 7 MÔN HỌC CHUẨN SGK LỚP 5 (2025-2026)
1. 📐 **TOÁN**: Số thập phân, Tỉ số phần trăm, Hình học không gian & Game tính nhanh.
2. 📚 **TIẾNG VIỆT**: Luyện từ và câu, Từ đồng nghĩa/trái nghĩa, Đọc hiểu văn bản.
3. 🧪 **KHOA HỌC**: Sự biến đổi của chất, Khám phá năng lượng, Cơ thể người.
4. 🗺️ **LỊCH SỬ VÀ ĐỊA LÝ**: Bản đồ tương tác các vùng miền Việt Nam, Mốc lịch sử hào hùng.
5. 💻 **CÔNG NGHỆ**: An toàn trên Internet, Mô hình kỹ thuật số & Tin học tiểu học.
6. ❤️ **ĐẠO ĐỨC**: Lòng biết ơn, Xử lý tình huống văn minh & Yêu thương gia đình.
7. ✨ **HOẠT ĐỘNG TRẢI NGHIỆM**: Sổ tay việc nhà, Tình bạn & Dự án lớp học xanh.

---

## 🤖 QUY TRÌNH TRỢ LÝ AI HỌC TẬP (6 BƯỚC KHÉP KÍN)

Hệ thống ứng dụng quy trình EdTech hiện đại:
```
Giao nhiệm vụ ➔ Học tập ➔ Hỗ trợ AI ➔ Đánh giá ➔ Phản hồi ➔ Cá nhân hóa
```
- **Hỗ trợ bài làm**: AI giải thích từng bước mà không cho đáp án trực tiếp để giúp học sinh tự tư duy.
- **Nhiệm vụ cá nhân hóa**: Dựa trên điểm số và thời gian làm bài, AI đề xuất bài tập rèn luyện tiếp theo phù hợp năng lực học sinh.

---

## 🔐 HỆ THỐNG XÁC THỰC & PHÂN QUYỀN (SUPABASE AUTH & RLS)
- **Đăng nhập Học sinh**: Học sinh đăng nhập nhanh bằng **Họ tên + Ngày tháng năm sinh** theo danh sách lớp 5/4.
- **Giáo viên & Admin**: Đăng nhập Email + Mật khẩu qua Supabase Auth.
- **Row Level Security (RLS)**: Bật RLS trên toàn bộ 8 bảng CSDL PostgreSQL (`profiles`, `classes`, `class_members`, `materials`, `assignments`, `student_progress`, `question_bank`, `ai_recommendations`).

---

## 🛠️ HƯỚNG DẪN CHẠY DỰ ÁN CỤ THỂ

### 1. Cài đặt Dependencies & Chạy Dev:
```bash
# Cài đặt thư viện
npm install

# Chạy trang web ở môi trường Development
npm run dev
```

### 2. Cấu hình Supabase Cơ sở dữ liệu:
1. Mở dự án Supabase của bạn tại [supabase.com](https://supabase.com).
2. Vào mục **SQL Editor**, dán toàn bộ nội dung file [`schema.sql`](./schema.sql) và nhấn **Run**.
3. Tạo file `.env` từ file mẫu `.env.example`:
```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 3. Build & Deploy Vercel:
```bash
# Kiểm tra build sản phẩm
npm run build
```
Dự án đã chuẩn bị sẵn file [`vercel.json`](./vercel.json), bạn chỉ cần kết nối repository này với Vercel để deploy 1-click.

---

## 📜 GIẤY PHÉP & BẢN QUYỀN
© 2025 - 2026 Trường Tiểu học Lê Văn Tám, Lớp 5/4. GVCN: **PHAN THỊ DIỄM TRANG**.
