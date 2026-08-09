import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FilePlus, 
  Key, 
  ShieldCheck, 
  TrendingUp, 
  Plus, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { CLASS_ROSTER_54, SCHOOL_INFO, INITIAL_QUESTION_BANK } from '../lib/curriculumData';
import { QuestionBankModal } from '../components/QuestionBankModal';
import { isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'questions' | 'reports' | 'database'
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [joinCode] = useState('LVT-54-2025');
  const [studentList, setStudentList] = useState(CLASS_ROSTER_54);

  // New Student state
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentDob, setNewStudentDob] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newObj = {
      id: `hs-${Date.now()}`,
      name: newStudentName.trim(),
      dob: newStudentDob || '2015-01-01',
      gender: 'Chưa rõ',
      stars: 10,
      badge: 'Thành viên Mới'
    };

    setStudentList(prev => [newObj, ...prev]);
    setNewStudentName('');
    setNewStudentDob('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Bảng Điều Khiển Giáo Viên / Admin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Quản Lý Lớp 5/4 & Học Liệu Tương Tác
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            GVCN: <strong>{SCHOOL_INFO.teacherName}</strong> • Mã lớp: <code className="bg-rose-950 px-2 py-0.5 rounded text-amber-300 font-mono font-bold">{joinCode}</code>
          </p>
        </div>

        <button
          onClick={() => setIsQuestionModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nhập Câu Hỏi Mới</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('students')}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'students' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-rose-600'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Danh Sách Học Sinh ({studentList.length - 1})</span>
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'questions' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-rose-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Ngân Hàng Câu Hỏi ({INITIAL_QUESTION_BANK.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'reports' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-rose-600'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Báo Cáo Tiến Độ</span>
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'database' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-rose-600'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Cấu Hình Supabase DB & RLS</span>
        </button>
      </div>

      {/* TAB 1: Danh sách học sinh */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          
          {/* Add Student Form */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-4">
            <h3 className="font-bold text-slate-800 text-base font-serif flex items-center gap-2">
              <Plus className="w-5 h-5 text-rose-600" />
              Thêm Trực Tiếp Học Sinh Vào Lớp 5/4
            </h3>

            <form onSubmit={handleAddStudent} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="Họ và Tên học sinh"
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"
                required
              />
              <input
                type="date"
                value={newStudentDob}
                onChange={(e) => setNewStudentDob(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-colors"
              >
                Thêm Vào Danh Sách
              </button>
            </form>
          </div>

          {/* Roster Table */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 pl-2">STT</th>
                  <th className="pb-3">Họ và Tên</th>
                  <th className="pb-3">Ngày Sinh</th>
                  <th className="pb-3">Huy Hiệu Thi Đua</th>
                  <th className="pb-3 text-right pr-2">Số Ngôi Sao</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {studentList.filter(s => s.role !== 'teacher').map((st, idx) => (
                  <tr key={st.id} className="hover:bg-rose-50/50">
                    <td className="py-3 pl-2 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 font-bold text-slate-800">{st.name}</td>
                    <td className="py-3 text-slate-500 font-mono">{st.dob}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold text-[10px]">
                        {st.badge}
                      </span>
                    </td>
                    <td className="py-3 text-right pr-2 font-bold text-amber-600">
                      ⭐ {st.stars}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: Ngân hàng câu hỏi */}
      {activeTab === 'questions' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-base font-serif">
              Quản Lý Ngân Hàng Câu Hỏi SGK Lớp 5
            </h3>
            <button
              onClick={() => setIsQuestionModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow"
            >
              + Thêm câu hỏi
            </button>
          </div>

          <div className="space-y-3">
            {INITIAL_QUESTION_BANK.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">
                      {q.subject}
                    </span>
                    <span className="font-bold text-slate-800">{idx + 1}. {q.question_text}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{q.topic}</span>
                </div>
                <div className="text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                  Đáp án đúng: {q.correct_answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Báo cáo tiến độ */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-6">
          <h3 className="font-bold text-slate-800 text-base font-serif">
            Báo Cáo Tỉ Lệ Hoàn Thành Bài Học & Game Lớp 5/4
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-xs font-bold text-emerald-700 uppercase">Đã hoàn thành</div>
              <div className="text-3xl font-extrabold text-emerald-900">85%</div>
              <div className="text-[10px] text-emerald-600 mt-1">32/38 Học sinh hoàn thành bài làm</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <div className="text-xs font-bold text-amber-700 uppercase">Đang thực hiện</div>
              <div className="text-3xl font-extrabold text-amber-900">10%</div>
              <div className="text-[10px] text-amber-600 mt-1">4 Học sinh đang làm dở bài tập</div>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
              <div className="text-xs font-bold text-rose-700 uppercase">Chưa bắt đầu</div>
              <div className="text-3xl font-extrabold text-rose-900">5%</div>
              <div className="text-[10px] text-rose-600 mt-1">2 Học sinh chưa truy cập bài làm</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Database Status */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 text-base font-serif flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-500" />
            Trạng Thái Kết Nối Supabase PostgreSQL & RLS Policies
          </h3>

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            isSupabaseConfigured() ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-2">
              {isSupabaseConfigured() ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <div>
                <strong>Trạng thái kết nối Supabase Live:</strong>{' '}
                {isSupabaseConfigured() ? 'Đang kết nối API Supabase thực tế!' : 'Đang chạy chế độ Client Fallback (Chưa điền biến môi trường .env).'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 font-mono text-[11px] leading-relaxed space-y-2">
            <p className="text-amber-400 font-bold">SQL Migration Script (schema.sql):</p>
            <p>✔ Profiles (FK -&gt; auth.users, RLS Enabled)</p>
            <p>✔ Classes &amp; Class Members (RLS Policies for Admin, Teacher, Student)</p>
            <p>✔ Materials &amp; Assignments (Game iFrame, HTML5 Zip, Document)</p>
            <p>✔ Student Progress &amp; Question Bank</p>
            <p>✔ Trigger function handle_new_user() on auth.users insert</p>
          </div>
        </div>
      )}

      <QuestionBankModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
      />

    </div>
  );
};
