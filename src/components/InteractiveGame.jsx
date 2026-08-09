import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  BrainCircuit, 
  ExternalLink,
  Award,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_QUESTION_BANK } from '../lib/curriculumData';

export const InteractiveGame = ({ subjectCode = 'TOAN', onFinishGame }) => {
  // Filter questions for current subject
  const questions = INITIAL_QUESTION_BANK.filter(q => q.subject === subjectCode);
  const currentQuestions = questions.length > 0 ? questions : INITIAL_QUESTION_BANK.slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [gameMode, setGameMode] = useState('custom_quiz'); // 'custom_quiz' | 'iframe'

  // Live timer
  useEffect(() => {
    let interval;
    if (!isGameFinished && gameMode === 'custom_quiz') {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameFinished, gameMode]);

  const currentQ = currentQuestions[currentIndex];

  const handleSelectOption = (opt) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correct_answer;
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsGameFinished(true);
      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback if canvas-confetti script isn't loaded
      }
      if (onFinishGame) {
        onFinishGame({ score, total: currentQuestions.length * 10, time: timerSeconds });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setTimerSeconds(0);
    setIsGameFinished(false);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-xl border border-rose-100 water-ink-border">
      
      {/* Game Mode Switcher */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-md">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg font-serif">
              Trò Chơi Học Tập Tương Tác SGK Lớp 5
            </h3>
            <p className="text-xs text-slate-500 font-medium">Môn: {subjectCode}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setGameMode('custom_quiz')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              gameMode === 'custom_quiz'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Quiz Tương Tác
          </button>
          <button
            onClick={() => {
              setGameMode('iframe');
              setIframeUrl('https://wordwall.net/embed/4060b299e4f54e15b57f2081d4b68453');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              gameMode === 'iframe'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Nhúng Game (Wordwall / Quizizz)
          </button>
        </div>
      </div>

      {/* IFRAME GAME MODE */}
      {gameMode === 'iframe' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              placeholder="Nhập liên kết nhúng iFrame (Wordwall, Quizizz, Kahoot, HTML5 zip...)"
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"
            />
            <a
              href={iframeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold flex items-center gap-1 hover:bg-slate-700"
            >
              <span>Mở tab mới</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner">
            <iframe
              src={iframeUrl}
              title="Interactive Educational Game"
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : isGameFinished ? (
        /* GAME FINISHED SCREEN */
        <div className="text-center py-8 space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-amber-600 shadow-lg animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-slate-800 font-serif">
              CHÚC MỪNG EM ĐÃ HOÀN THÀNH BÀI TẬP!
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Điểm số của em đã được ghi nhận vào Bảng vinh danh Lớp 5/4.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 py-4">
            <div className="bg-rose-50 border border-rose-200 px-6 py-3 rounded-2xl">
              <div className="text-xs font-bold text-rose-600 uppercase">Tổng Điểm</div>
              <div className="text-3xl font-extrabold text-rose-700">{score} điểm</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 px-6 py-3 rounded-2xl">
              <div className="text-xs font-bold text-amber-600 uppercase">Thời Gian</div>
              <div className="text-3xl font-extrabold text-amber-700">{timerSeconds} giây</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại Trò Chơi</span>
          </button>
        </div>
      ) : (
        /* CUSTOM QUIZ ENGINE */
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700">
                Câu {currentIndex + 1} / {currentQuestions.length}
              </span>
              <span className="text-slate-400">Chủ đề: {currentQ.topic}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-600">
                <Trophy className="w-4 h-4" />
                <span>Điểm: {score}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 font-mono">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{timerSeconds}s</span>
              </div>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-relaxed">
              {currentQ.question_text}
            </h4>
          </div>

          {/* Option Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrectAnswer = option === currentQ.correct_answer;

              let btnStyle = 'bg-white border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-slate-800';
              if (isSelected) {
                btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
              }
              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed animate-fade-in">
              <strong className="font-bold flex items-center gap-1 text-amber-800 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Giải thích đáp án SGK Lớp 5:
              </strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-end pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-colors"
              >
                Trả Lời
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <span>{currentIndex < currentQuestions.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
