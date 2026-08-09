import React, { useState } from 'react';
import { X, Plus, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { SUBJECTS_LIST } from '../lib/curriculumData';

export const QuestionBankModal = ({ isOpen, onClose, onAddQuestion }) => {
  const [subject, setSubject] = useState('TOAN');
  const [topic, setTopic] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQ = {
      id: `q-custom-${Date.now()}`,
      subject,
      topic: topic || 'Tổng hợp SGK Lớp 5',
      question_text: questionText,
      options: [optA, optB, optC, optD].filter(Boolean),
      correct_answer: correctAnswer || optA,
      explanation: explanation || 'Đáp án chính xác theo chương trình SGK Lớp 5.',
      difficulty,
    };

    if (onAddQuestion) {
      onAddQuestion(newQ);
    }

    setSuccessMsg('Đã thêm thành công câu hỏi mới vào Ngân hàng câu hỏi!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-serif">Nhập Câu Hỏi Mới vào Ngân Hàng</h3>
              <p className="text-xs text-slate-400">Dành cho Giáo viên Chủ nhiệm & Bộ môn Lớp 5/4</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Môn Học:</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-rose-500 font-medium"
                >
                  {SUBJECTS_LIST.map((sub) => (
                    <option key={sub.id} value={sub.code}>{sub.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Độ Khó:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-rose-500"
                >
                  <option value="easy">Dễ</option>
                  <option value="medium">Trung bình</option>
                  <option value="hard">Khó</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chủ Đề Bài Học SGK:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ví dụ: Số thập phân / Từ đồng nghĩa"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nội Dung Câu Hỏi:</label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Nhập nội dung câu hỏi trắc nghiệm..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">Các Lựa Chọn Đáp Án:</label>
              <input
                type="text"
                value={optA}
                onChange={(e) => setOptA(e.target.value)}
                placeholder="Đáp án A"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                required
              />
              <input
                type="text"
                value={optB}
                onChange={(e) => setOptB(e.target.value)}
                placeholder="Đáp án B"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                required
              />
              <input
                type="text"
                value={optC}
                onChange={(e) => setOptC(e.target.value)}
                placeholder="Đáp án C"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
              />
              <input
                type="text"
                value={optD}
                onChange={(e) => setOptD(e.target.value)}
                placeholder="Đáp án D"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Đáp Án Đúng:</label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Nhập chính xác văn bản của đáp án đúng"
                className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50/50 text-xs focus:outline-none focus:border-emerald-500 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giải Thích Chi Tiết:</label>
              <input
                type="text"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Lời giải ghi nhận cho học sinh..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Lưu Vào CSDL Supabase
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
