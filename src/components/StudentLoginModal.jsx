import React, { useState } from 'react';
import { X, User, Calendar, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CLASS_ROSTER_54 } from '../lib/curriculumData';

export const StudentLoginModal = ({ isOpen, onClose }) => {
  const { loginStudentByNameAndDob } = useAuth();
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập Họ và Tên của em.');
      return;
    }

    const res = loginStudentByNameAndDob(fullName, dob || '2015-01-01');
    if (res.success) {
      setErrorMsg('');
      onClose();
    }
  };

  const handleSelectQuickRoster = (student) => {
    setFullName(student.name);
    setDob(student.dob);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 water-ink-border">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-serif">Đăng Nhập Học Sinh</h3>
              <p className="text-xs text-rose-100 font-medium">Lớp 5/4 - Trường TH Lê Văn Tám</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Họ và Tên Học sinh:
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Ngày tháng năm sinh:
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                * Học sinh đăng nhập bằng Họ tên và Ngày sinh chính xác theo sổ danh sách lớp.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Vào Học Tập & Nhận Nhiệm Vụ
            </button>
          </form>

          {/* Quick Click Roster Helper */}
          <div className="mt-6 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
              <span>Gợi ý chọn nhanh tên trong danh sách Lớp 5/4:</span>
              <span className="text-rose-600 text-[11px]">{CLASS_ROSTER_54.length - 1} Học sinh</span>
            </div>
            <div className="max-h-36 overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
              {CLASS_ROSTER_54.filter(s => s.role !== 'teacher').slice(0, 8).map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => handleSelectQuickRoster(student)}
                  className="w-full text-left px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 hover:text-rose-700 border border-slate-200/60 text-xs font-medium flex items-center justify-between transition-colors"
                >
                  <span>{student.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{student.dob}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
