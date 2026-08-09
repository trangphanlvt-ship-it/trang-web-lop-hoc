import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BrainCircuit, 
  Lightbulb, 
  HelpCircle,
  Award,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SUBJECTS_LIST } from '../lib/curriculumData';

export const AITutorModal = ({ isOpen, onClose, selectedSubject = 'TOAN' }) => {
  const { currentStudent } = useAuth();
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'workflow' | 'recommendations'
  const [inputQuestion, setInputQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Xin chào ${currentStudent?.name || 'em'}! Thầy/Cô Trợ lý AI Lớp 5/4 đây. Em đang gặp vướng mắc bài tập môn nào? Hãy đặt câu hỏi, thầy cô sẽ hướng dẫn em từng bước nhé!`,
      timestamp: 'Ngay bây giờ'
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Personalized practice task list based on AI workflow
  const [personalizedTasks, setPersonalizedTasks] = useState([
    {
      id: 'rec-1',
      subject: 'TOAN',
      title: 'Luyện tập Số thập phân & Phép cộng số thập phân',
      reason: 'Dựa trên kết quả bài làm gần nhất (đạt 8/10), AI nhận thấy em cần củng cố cách đặt tính số thập phân.',
      difficulty: 'Trung bình',
      stars: 15,
      completed: false
    },
    {
      id: 'rec-2',
      subject: 'TIENG_VIET',
      title: 'Ghép câu ghép có quan hệ từ "Tuy... nhưng..."',
      reason: 'AI gợi ý bài tập nâng cao vốn từ vựng Luyện từ và câu Lớp 5.',
      difficulty: 'Dễ',
      stars: 10,
      completed: true
    },
    {
      id: 'rec-3',
      subject: 'KHOA_HOC',
      title: 'Khám phá Hiện tượng biến đổi Hóa học',
      reason: 'Em trả lời chính xác câu hỏi thí nghiệm, hãy thử sức với trò chơi mô phỏng phòng lab nhé!',
      difficulty: 'Khó',
      stars: 20,
      completed: false
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const qText = inputQuestion;
    setInputQuestion('');
    setIsAiThinking(true);

    // Simulate AI EdTech reasoning
    setTimeout(() => {
      let aiResponseText = `Cảm ơn em! Đối với câu hỏi "${qText}", Trợ lý AI gợi ý cho em như sau:\n\n1. Hãy đọc kỹ đề bài và xác định từ khóa chính.\n2. Áp dụng công thức SGK Lớp 5.\n3. Thử thực hành lại theo từng bước. Em hãy cho thầy cô biết kết quả bước 1 em tính ra bao nhiêu nhé!`;

      if (qText.toLowerCase().includes('toán') || qText.toLowerCase().includes('số thập phân') || qText.toLowerCase().includes('tỉ số')) {
        aiResponseText = `Về môn Toán Lớp 5: Để giải bài này, em hãy nhớ quy tắc: Muốn tìm tỉ số phần trăm của 2 số A và B, ta lấy A chia cho B rồi nhân với 100%. Em thử đặt phép tính nhé!`;
      } else if (qText.toLowerCase().includes('tiếng việt') || qText.toLowerCase().includes('từ đồng nghĩa')) {
        aiResponseText = `Về môn Tiếng Việt: Từ đồng nghĩa là những từ có nghĩa giống nhau hoặc gần giống nhau. Ví dụ: 'Chăm chỉ' đồng nghĩa với 'Cần cù', 'Chịu khó'.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsAiThinking(false);
    }, 1000);
  };

  const handleCompleteTask = (id) => {
    setPersonalizedTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: true } : t)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
              <Bot className="w-6 h-6 text-amber-300 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-serif flex items-center gap-2">
                Trợ Lý AI Học Tập Lớp 5/4
                <span className="text-[10px] bg-amber-400 text-slate-950 font-sans font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Quy trình 6 Bước
                </span>
              </h3>
              <p className="text-xs text-rose-100">
                Giao nhiệm vụ • Học tập • Hỗ trợ • Đánh giá • Phản hồi • Cá nhân hóa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'chat'
                ? 'border-rose-600 text-rose-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-rose-600'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Hỏi Trợ Lý AI</span>
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'workflow'
                ? 'border-rose-600 text-rose-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-rose-600'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Quy Trình Học Tập AI</span>
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'recommendations'
                ? 'border-rose-600 text-rose-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-rose-600'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Nhiệm Vụ Cá Nhân Hóa</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/50">
          
          {/* TAB 1: Chat Interface */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[360px]">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-rose-600 text-white rounded-br-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span
                        className={`block text-[10px] mt-1.5 text-right ${
                          msg.sender === 'user' ? 'text-rose-200' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isAiThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-600" />
                      <span>Trợ lý AI đang suy nghĩ hướng dẫn bài làm...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Quick Questions */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-slate-500 mb-1.5">Gợi ý câu hỏi nhanh:</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setInputQuestion('Giảng giúp em bài Toán tỉ số phần trăm')}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    📐 Toán tỉ số phần trăm
                  </button>
                  <button
                    onClick={() => setInputQuestion('Cách phân biệt từ đồng nghĩa và từ trái nghĩa?')}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                  >
                    📚 Từ đồng nghĩa Tiếng Việt
                  </button>
                  <button
                    onClick={() => setInputQuestion('Sự biến đổi hóa học là gì?')}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    🧪 Biến đổi hóa học Khoa học
                  </button>
                </div>
              </div>

              {/* Input box */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  placeholder="Nhập câu hỏi em gặp khó khăn..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: AI Workflow Diagram */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h4 className="font-bold text-slate-800 text-base font-serif">
                  Quy Trình Học Tập & Hỗ Trợ AI Cá Nhân Hóa Lớp 5/4
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Được thiết kế chuẩn phương pháp sư phạm EdTech cho học sinh tiểu học.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-blue-200 shadow-sm">
                  <div className="text-xs font-extrabold text-blue-600 uppercase mb-1">1. Giao Nhiệm Vụ</div>
                  <p className="text-xs text-slate-600">Giáo viên chọn bài tập/game từ Kho học liệu giao cho Lớp 5/4.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-rose-200 shadow-sm">
                  <div className="text-xs font-extrabold text-rose-600 uppercase mb-1">2. Học Tập</div>
                  <p className="text-xs text-slate-600">Học sinh tương tác trực tiếp qua game, câu hỏi trắc nghiệm & bài đọc.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-sm">
                  <div className="text-xs font-extrabold text-amber-600 uppercase mb-1">3. Hỗ Trợ AI</div>
                  <p className="text-xs text-slate-600">Trợ lý AI hướng dẫn gợi ý từng bước mà không cho trực tiếp đáp án.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-sm">
                  <div className="text-xs font-extrabold text-purple-600 uppercase mb-1">4. Đánh Giá</div>
                  <p className="text-xs text-slate-600">Hệ thống tính điểm số và ghi nhận thời gian hoàn thành bài tập.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-teal-200 shadow-sm">
                  <div className="text-xs font-extrabold text-teal-600 uppercase mb-1">5. Phản Hồi</div>
                  <p className="text-xs text-slate-600">Giải thích chi tiết đáp án đúng/sai giúp học sinh khắc sâu kiến thức.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-sm">
                  <div className="text-xs font-extrabold text-emerald-600 uppercase mb-1">6. Cá Nhân Hóa</div>
                  <p className="text-xs text-slate-600">AI tự động đề xuất nhiệm vụ luyện tập tiếp theo phù hợp lực học.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Personalized Task Recommendations */}
          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    Nhiệm Vụ Luyện Tập Do AI Đề Xuất
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dành riêng cho học sinh: <strong>{currentStudent?.name || 'Học sinh Lớp 5/4'}</strong>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                  {personalizedTasks.filter(t => !t.completed).length} Nhiệm vụ cần hoàn thành
                </span>
              </div>

              <div className="space-y-3">
                {personalizedTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      task.completed
                        ? 'bg-slate-100/60 border-slate-200 opacity-75'
                        : 'bg-white border-rose-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                            {task.subject}
                          </span>
                          <span className="text-xs font-bold text-amber-600">
                            ⭐ +{task.stars} Ngôi sao
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Độ khó: {task.difficulty}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm">{task.title}</h5>
                        <p className="text-xs text-slate-600 mt-1 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                          🤖 <strong>Ghi chú AI:</strong> {task.reason}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        disabled={task.completed}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 ${
                          task.completed
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-600 hover:bg-rose-700 text-white shadow'
                        }`}
                      >
                        {task.completed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Đã hoàn thành</span>
                          </>
                        ) : (
                          <>
                            <span>Làm bài ngay</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
