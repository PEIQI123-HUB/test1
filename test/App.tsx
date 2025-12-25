
import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuestionType, Category, UserAnswer, ExamResult } from './types';
import { QUESTION_BANK } from './questions';

const EXAM_SIZE = 30; 
const STATS_KEY = 'qianchuan_exam_stats_v1.5';

interface QuestionStats {
  correct: number;
  total: number;
}

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'exam' | 'result'>('home');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [finalResult, setFinalResult] = useState<ExamResult | null>(null);
  const [stats, setStats] = useState<Record<string, QuestionStats>>({});

  useEffect(() => {
    const savedStats = localStorage.getItem(STATS_KEY);
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  const resetStats = () => {
    if (window.confirm('确定要清除所有练习记录吗？')) {
      localStorage.removeItem(STATS_KEY);
      setStats({});
    }
  };

  const startExam = useCallback(() => {
    const weightedPool: Question[] = [];
    QUESTION_BANK.forEach(q => {
      const qStat = stats[q.id] || { correct: 0, total: 0 };
      let effectiveWeight = q.weight;
      if (qStat.total >= 3) {
        const accuracy = qStat.correct / qStat.total;
        if (accuracy > 0.8) effectiveWeight = Math.max(0.1, q.weight * (1.1 - accuracy));
      }
      const slots = Math.max(1, Math.round(effectiveWeight * 10));
      for (let i = 0; i < slots; i++) weightedPool.push(q);
    });

    const shuffledPool = weightedPool.sort(() => Math.random() - 0.5);
    const selectedIds = new Set<string>();
    const selected: Question[] = [];
    for (const q of shuffledPool) {
      if (!selectedIds.has(q.id)) {
        selected.push(q);
        selectedIds.add(q.id);
      }
      if (selected.length === EXAM_SIZE || selected.length === QUESTION_BANK.length) break;
    }
    setQuestions(selected);
    setUserAnswers([]);
    setCurrentIndex(0);
    setStartTime(Date.now());
    setView('exam');
    window.scrollTo(0, 0);
  }, [stats]);

  const handleAnswerSelect = (selected: string | string[]) => {
    const qId = questions[currentIndex].id;
    const existingIndex = userAnswers.findIndex(a => a.questionId === qId);
    if (existingIndex > -1) {
      const newAnswers = [...userAnswers];
      newAnswers[existingIndex] = { questionId: qId, selected };
      setUserAnswers(newAnswers);
    } else {
      setUserAnswers([...userAnswers, { questionId: qId, selected }]);
    }
  };

  const submitExam = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    let correctCount = 0;
    const newStats = { ...stats };
    
    questions.forEach((q) => {
      const userAnswer = userAnswers.find(a => a.questionId === q.id);
      const isCorrect = (() => {
        if (!userAnswer) return false;
        if (q.type === QuestionType.MULTIPLE) {
          const sortedUser = [...(userAnswer.selected as string[] || [])].sort();
          const sortedAns = [...(q.answer as string[])].sort();
          return JSON.stringify(sortedUser) === JSON.stringify(sortedAns);
        }
        return userAnswer.selected === q.answer;
      })();
      if (isCorrect) correctCount++;
      if (!newStats[q.id]) newStats[q.id] = { correct: 0, total: 0 };
      newStats[q.id].total += 1;
      if (isCorrect) newStats[q.id].correct += 1;
    });

    setStats(newStats);
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    setFinalResult({ score: Math.round((correctCount / questions.length) * 100), totalQuestions: questions.length, correctCount, wrongCount: questions.length - correctCount, timeTaken });
    setView('result');
    window.scrollTo(0, 0);
  };

  const renderHome = () => {
    const masteredCount = (Object.values(stats) as QuestionStats[]).filter(s => s.total >= 3 && s.correct / s.total > 0.8).length;
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-slate-100 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-100">
            <i className="fa-solid fa-graduation-cap text-4xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">千川认证模拟练习</h1>
          <p className="text-slate-400 mb-8 text-sm px-4">真题注入 · 权重抽题 · 移动优化版</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="text-2xl font-black text-blue-600">{masteredCount}</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">已掌握</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="text-2xl font-black text-slate-700">{Object.keys(stats).length}</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">总练习数</div>
            </div>
          </div>

          <button onClick={startExam} className="w-full bg-blue-600 active:bg-blue-800 text-white font-bold py-5 px-6 rounded-2xl transition-all shadow-xl shadow-blue-100 active:scale-95 mb-6 text-lg">
            开启 30 题全真模拟
          </button>

          <button onClick={resetStats} className="text-xs text-slate-400 hover:text-red-500 transition-colors py-2 px-4 border border-transparent rounded-lg">
            重置练习数据
          </button>
        </div>
      </div>
    );
  };

  const renderExam = () => {
    const q = questions[currentIndex];
    const userAnswer = userAnswers.find(a => a.questionId === q.id);
    const selectedValue = userAnswer?.selected;

    return (
      <div className="min-h-screen pb-24">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button onClick={() => setView('home')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question</span>
              <span className="text-lg font-black text-blue-600">{currentIndex + 1} <span className="text-slate-300 font-normal">/ {questions.length}</span></span>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold text-xs">
              {Math.round(((currentIndex + 1) / questions.length) * 100)}%
            </div>
          </div>
          <div className="max-w-3xl mx-auto mt-4 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
             <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-4 md:p-8 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 mb-8 min-h-[300px]">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider">{q.type === QuestionType.SINGLE ? '单选' : q.type === QuestionType.MULTIPLE ? '多选' : '判断'}</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg">{q.category}</span>
              {q.weight === 3 && <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-lg"><i className="fa-solid fa-fire mr-1"></i> 高频考点</span>}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug mb-10">{q.text}</h2>

            <div className="space-y-4">
              {(q.type === QuestionType.BOOLEAN ? ['A. 正确', 'B. 错误'] : (q.options || [])).map((opt) => {
                const key = opt.charAt(0);
                const isSelected = q.type === QuestionType.MULTIPLE ? (selectedValue as string[])?.includes(key) : selectedValue === key;
                return (
                  <button key={key} onClick={() => q.type === QuestionType.MULTIPLE ? ((k) => {
                    let cur = (selectedValue as string[]) || [];
                    handleAnswerSelect(cur.includes(k) ? cur.filter(x => x !== k) : [...cur, k]);
                  })(key) : handleAnswerSelect(key)} className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 active:scale-[0.98] ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-600'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold border-2 transition-colors ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                      {key}
                    </div>
                    <span className="flex-1 font-medium">{opt.includes('、') ? opt.split('、')[1] : (opt.includes('.') ? opt.split('.')[1] : opt.substring(2))}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Bottom Controls */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-100 z-10 shadow-lg">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <button onClick={() => { if(currentIndex > 0) { setCurrentIndex(currentIndex - 1); window.scrollTo(0,0); } }} disabled={currentIndex === 0} className={`h-14 px-6 rounded-2xl font-bold flex items-center justify-center transition-all ${currentIndex === 0 ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-slate-600 active:bg-slate-200'}`}>
              上一题
            </button>
            {currentIndex === questions.length - 1 ? (
              <button onClick={submitExam} className="h-14 flex-1 bg-green-600 active:bg-green-700 text-white font-black rounded-2xl shadow-lg shadow-green-100 text-lg transition-all active:scale-95">
                交卷评分
              </button>
            ) : (
              <button onClick={() => { setCurrentIndex(currentIndex + 1); window.scrollTo(0,0); }} className="h-14 flex-1 bg-blue-600 active:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-100 text-lg transition-all active:scale-95">
                下一题
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!finalResult) return null;
    const { score, correctCount, wrongCount, timeTaken } = finalResult;

    return (
      <div className="min-h-screen bg-slate-50 p-4 pb-24 animate-fadeIn">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden mb-8 border border-white">
            <div className={`p-12 text-center text-white ${score >= 60 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-rose-500 to-red-600'} relative`}>
              <div className="absolute top-4 right-6 opacity-20 text-8xl italic font-black">RESULT</div>
              <h2 className="text-lg font-bold mb-2 opacity-80 uppercase tracking-widest">Exam Score</h2>
              <div className="text-[7rem] font-black leading-none mb-6 drop-shadow-xl">{score}</div>
              <div className="inline-flex items-center gap-2 bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm text-sm font-bold">
                <i className={`fa-solid ${score >= 60 ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                {score >= 60 ? '考试通过 · 保持状态' : '未达标 · 建议复练习'}
              </div>
            </div>
            
            <div className="grid grid-cols-3 bg-white p-8 gap-4 text-center">
              <div><div className="text-xl font-black text-emerald-600">{correctCount}</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">正确数</div></div>
              <div><div className="text-xl font-black text-rose-500">{wrongCount}</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">错误数</div></div>
              <div><div className="text-xl font-black text-slate-700">{Math.floor(timeTaken / 60)}m {timeTaken % 60}s</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">用时</div></div>
            </div>

            <div className="p-6 md:p-10 border-t border-slate-50">
              <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                错题复盘与深度解析
              </h3>
              <div className="space-y-8">
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers.find(a => a.questionId === q.id);
                  const isCorrect = q.type === QuestionType.MULTIPLE ? JSON.stringify([...(userAnswer?.selected as string[] || [])].sort()) === JSON.stringify([...(q.answer as string[])].sort()) : userAnswer?.selected === q.answer;
                  if (isCorrect) return null; // 只展示错题，节省移动端屏幕空间
                  const options = q.type === QuestionType.BOOLEAN ? ['A. 正确', 'B. 错误'] : (q.options || []);

                  return (
                    <div key={q.id} className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 animate-fadeIn">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shrink-0 text-sm">{idx + 1}</div>
                        <p className="font-bold text-slate-700 leading-relaxed text-base">{q.text}</p>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        {options.map((opt) => {
                          const key = opt.charAt(0);
                          const isUserSelected = Array.isArray(userAnswer?.selected) ? userAnswer?.selected.includes(key) : userAnswer?.selected === key;
                          const isCorrectOption = Array.isArray(q.answer) ? q.answer.includes(key) : q.answer === key;
                          
                          let style = "bg-white text-slate-500 border-transparent";
                          if (isCorrectOption) style = "bg-emerald-50 text-emerald-700 border-emerald-100 border";
                          else if (isUserSelected) style = "bg-rose-50 text-rose-700 border-rose-100 border";

                          return (
                            <div key={key} className={`p-4 rounded-xl text-sm flex items-center gap-3 border ${style}`}>
                               <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] ${isCorrectOption ? 'bg-emerald-500 text-white' : (isUserSelected ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500')}`}>{key}</div>
                               <span className="flex-1 font-medium">{opt.includes('、') ? opt.split('、')[1] : (opt.includes('.') ? opt.split('.')[1].trim() : opt)}</span>
                               {isCorrectOption && <i className="fa-solid fa-check text-emerald-500"></i>}
                            </div>
                          );
                        })}
                      </div>
                      
                      {q.explanation && (
                        <div className="p-5 bg-white rounded-2xl text-sm text-slate-600 shadow-sm border border-slate-100">
                          <div className="text-blue-600 font-black mb-1 text-xs uppercase tracking-widest">Exam Analysis</div>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
                {correctCount === EXAM_SIZE && <div className="p-20 text-center text-slate-300 font-bold">全对！无需复盘。</div>}
              </div>
            </div>

            <div className="p-10 bg-slate-900 text-center">
              <button onClick={() => setView('home')} className="w-full bg-white text-slate-900 font-black py-5 px-8 rounded-2xl shadow-xl active:scale-95 transition-all text-lg">
                回首页继续练习
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen custom-scrollbar overflow-x-hidden">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>
      {view === 'home' && renderHome()}
      {view === 'exam' && renderExam()}
      {view === 'result' && renderResult()}
    </div>
  );
};

export default App;
