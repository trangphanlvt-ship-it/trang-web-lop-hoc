import React, { useState } from 'react';
import { Landmark, Sparkles, Heart, Award, CheckCircle2, Trophy } from 'lucide-react';
import { HO_CHI_MINH_CULTURE_SPACE, SCHOOL_INFO } from '../lib/curriculumData';

export const HCMCultureSpacePage = () => {
  const [selectedStory, setSelectedStory] = useState(HO_CHI_MINH_CULTURE_SPACE.stories[0]);
  const [hcmScore, setHcmScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const hcmQuizQuestions = [
    {
      id: 1,
      question: "Điều thứ nhất trong 5 Điều Bác Hồ dạy là gì?",
      options: [
        "Yêu tổ quốc, yêu đồng bào",
        "Học tập tốt, lao động tốt",
        "Đoàn kết tốt, kỷ luật tốt",
        "Giữ gìn vệ sinh thật tốt"
      ],
      answer: "Yêu tổ quốc, yêu đồng bào"
    },
    {
      id: 2,
      question: "Bác Hồ đọc Bản Tuyên ngôn Độc lập tại quảng trường nào?",
      options: [
        "Quảng trường Ba Đình (Hà Nội)",
        "Quảng trường Lam Sơn (Thanh Hóa)",
        "Công viên 23 tháng 9 (TP.HCM)",
        "Quảng trường Ngọ Môn (Huế)"
      ],
      answer: "Quảng trường Ba Đình (Hà Nội)"
    }
  ];

  const handleSelectAnswer = (qId, option) => {
    setUserAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleFinishQuiz = () => {
    let s = 0;
    hcmQuizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) s += 10;
    });
    setHcmScore(s);
    setQuizDone(true);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-900 via-rose-800 to-amber-900 text-white p-6 sm:p-10 shadow-2xl water-ink-border">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 text-xs font-bold uppercase">
            <Landmark className="w-4 h-4" />
            <span>Công Trình Văn Hóa Thiếu Nhi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif leading-tight">
            {HO_CHI_MINH_CULTURE_SPACE.title}
          </h2>

          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
            Nơi học sinh Lớp 5/4 – Trường TH Lê Văn Tám cùng nhau tìm hiểu cuộc đời, sự nghiệp vĩ đại và những bài học đạo đức sâu sắc của Chủ tịch Hồ Chí Minh.
          </p>
        </div>
      </div>

      {/* 5 Điều Bác Hồ Dạy */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200 water-ink-border space-y-6">
        <div className="text-center">
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase">
            Lời Dạy Thiêng Liêng
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-serif mt-2">
            5 ĐIỀU BÁC HỒ DẠY THIẾU NIÊN NHI ĐỒNG
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {HO_CHI_MINH_CULTURE_SPACE.fiveTeachings.map((item) => (
            <div
              key={item.number}
              className="p-4 rounded-2xl bg-gradient-to-b from-rose-50 to-amber-50 border border-rose-200 text-center space-y-2 shadow-sm hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 mx-auto rounded-full bg-rose-600 text-white font-extrabold text-sm flex items-center justify-center">
                {item.number}
              </div>
              <p className="font-bold text-slate-800 text-xs leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stories Gallery & Quiz */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Story Viewer */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-4">
          <h3 className="font-bold text-slate-800 text-base font-serif flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600" />
            Mẩu Chuyện Bác Hồ Với Thiếu Nhi
          </h3>

          <div className="flex gap-2 border-b border-slate-100 pb-2">
            {HO_CHI_MINH_CULTURE_SPACE.stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedStory.id === story.id
                    ? 'bg-rose-600 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {story.title}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-base font-serif">
              {selectedStory.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed italic bg-amber-50 p-3 rounded-xl border border-amber-200">
              "{selectedStory.summary}"
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedStory.content}
            </p>
          </div>
        </div>

        {/* Interactive HCM Quiz */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-4">
          <h3 className="font-bold text-slate-800 text-base font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Đố Vui Tương Tác Tìm Hiểu Bác Hồ
          </h3>

          {quizDone ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-lg">Em đạt được {hcmScore} điểm!</h4>
              <p className="text-xs text-slate-500">Chúc mừng em đã hoàn thành bài đố vui Không gian HCM.</p>
              <button
                onClick={() => setQuizDone(false)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow"
              >
                Làm Lại Đố Vui
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {hcmQuizQuestions.map((q) => (
                <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <p className="font-bold text-slate-800">{q.id}. {q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`w-full text-left p-2 rounded-xl border transition-all text-xs ${
                          userAnswers[q.id] === opt
                            ? 'bg-rose-100 border-rose-500 font-bold text-rose-900'
                            : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleFinishQuiz}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow"
              >
                Nộp Bài Đố Vui HCM
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
