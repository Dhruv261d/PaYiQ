import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  BarChart3, 
  Play, 
  HelpCircle,
  Hash,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import LatexRenderer from './LatexRenderer';
import { CHAPTERS, SUBJECTS } from '../data/taxonomy';

export default function CBTWorkspace({ questions = [] }) {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  
  // Test config
  const [selectedExam, setSelectedExam] = useState('JEE_MAIN');
  const [questionLimit, setQuestionLimit] = useState(10);
  const [activeTestQuestions, setActiveTestQuestions] = useState([]);
  
  // Test execution state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: 'A' or '12.5' }
  const [reviewFlags, setReviewFlags] = useState({}); // { [qId]: boolean }
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 mins default
  const timerRef = useRef(null);

  // Initialize test
  const startTest = () => {
    const pool = questions.length > 0 ? questions : [];
    // Shuffle or slice
    const selected = [...pool]
      .filter((q) => selectedExam === 'ALL' || q.exam === selectedExam)
      .slice(0, questionLimit);

    if (!selected.length && pool.length > 0) {
      // If none match strict exam, take general pool
      setActiveTestQuestions(pool.slice(0, questionLimit));
    } else {
      setActiveTestQuestions(selected);
    }

    setCurrentIndex(0);
    setUserAnswers({});
    setReviewFlags({});
    setTimeLeftSeconds(questionLimit * 90); // 1.5 mins per question
    setTestCompleted(false);
    setTestStarted(true);
  };

  // Timer loop
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeftSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            submitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [testStarted, testCompleted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId, optionId) => {
    setUserAnswers({ ...userAnswers, [qId]: optionId });
  };

  const handleNumericalInput = (qId, val) => {
    setUserAnswers({ ...userAnswers, [qId]: val });
  };

  const toggleReviewFlag = (qId) => {
    setReviewFlags({ ...reviewFlags, [qId]: !reviewFlags[qId] });
  };

  const clearResponse = (qId) => {
    const updated = { ...userAnswers };
    delete updated[qId];
    setUserAnswers(updated);
  };

  const submitTest = () => {
    clearInterval(timerRef.current);
    setTestCompleted(true);

    let correctCount = 0;
    activeTestQuestions.forEach((q) => {
      const userAns = userAnswers[q.id];
      const correctAns = (q.correct_answer || '').toString().trim().toUpperCase();
      if (userAns && userAns.trim().toUpperCase() === correctAns) {
        correctCount++;
      }
    });

    const percentage = (correctCount / (activeTestQuestions.length || 1)) * 100;
    if (percentage >= 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const currentQ = activeTestQuestions[currentIndex] || activeTestQuestions[0] || null;

  // Test setup screen
  if (!testStarted) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6 animate-in fade-in duration-200">
        <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-slate-800">
          
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">NTA/State CBT Mock Practice Mode</h2>
              <p className="text-xs text-slate-400">
                Self-timed real examination simulator with live palette & instant score breakdown.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Examination</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="JEE_MAIN">JEE Main Simulator</option>
                <option value="NEET">NEET UG Simulator</option>
                <option value="MHT_CET">MHT-CET Simulator</option>
                <option value="ALL">Mixed Competitive Pool</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Number of Questions</label>
              <select
                value={questionLimit}
                onChange={(e) => setQuestionLimit(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="5">Quick 5 Questions (7.5 Mins)</option>
                <option value="10">Standard 10 Questions (15 Mins)</option>
                <option value="20">Intensive 20 Questions (30 Mins)</option>
              </select>
            </div>
          </div>

          {/* Test Guidelines */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Test Instructions:</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Marking Scheme: <strong>+4 for Correct</strong>, <strong>-1 for Incorrect MCQ</strong>, <strong>0 for Unattempted</strong>.</li>
              <li>Questions feature live <strong>KaTeX equation rendering</strong> for authentic paper experience.</li>
              <li>Use the question navigation palette to flag items for review or jump directly.</li>
            </ul>
          </div>

          <button
            onClick={startTest}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            Start CBT Practice Exam
          </button>
        </div>
      </div>
    );
  }

  // Test Results Screen
  if (testCompleted) {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    activeTestQuestions.forEach((q) => {
      const userAns = userAnswers[q.id];
      const correctAns = (q.correct_answer || '').toString().trim().toUpperCase();
      if (!userAns) {
        unattemptedCount++;
      } else if (userAns.trim().toUpperCase() === correctAns) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalMarks = (correctCount * 4) - (incorrectCount * 1);
    const maxMarks = activeTestQuestions.length * 4;
    const accuracy = correctCount + incorrectCount > 0 
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
      : 0;

    return (
      <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-300">
        
        {/* Scorecard Banner */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border border-indigo-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-300 rounded-2xl border border-amber-500/30">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white">Performance Scorecard</h2>
                <p className="text-xs text-slate-400">Exam completed with instant AI evaluation</p>
              </div>
            </div>
            <button
              onClick={() => setTestStarted(false)}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Take Another Test
            </button>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Total Score</span>
              <div className="text-2xl font-black text-indigo-400">
                {totalMarks} <span className="text-xs text-slate-500 font-normal">/ {maxMarks}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Accuracy</span>
              <div className="text-2xl font-black text-emerald-400">{accuracy}%</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Correct</span>
              <div className="text-2xl font-black text-emerald-400">{correctCount}</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Incorrect</span>
              <div className="text-2xl font-black text-rose-400">{incorrectCount}</div>
            </div>
          </div>
        </div>

        {/* Detailed Solutions Review */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Detailed Question-by-Question Solution Review
          </h3>

          {activeTestQuestions.map((q, idx) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns && userAns.trim().toUpperCase() === q.correct_answer.trim().toUpperCase();
            const isAttempted = !!userAns;

            return (
              <div key={q.id} className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-300">Question {idx + 1}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    !isAttempted
                      ? 'bg-slate-800 text-slate-400'
                      : (isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300')
                  }`}>
                    {!isAttempted ? 'Unattempted (0)' : (isCorrect ? 'Correct (+4)' : 'Incorrect (-1)')}
                  </span>
                </div>

                <div className="text-xs md:text-sm text-slate-200">
                  <LatexRenderer text={q.question_text} />
                </div>

                {/* Given Answer vs Correct Answer */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Your Answer: </span>
                    <span className="font-mono font-bold text-white">{userAns || 'None'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Correct Answer: </span>
                    <span className="font-mono font-bold text-emerald-400">{q.correct_answer}</span>
                  </div>
                </div>

                {/* Solution */}
                <div className="pt-2 text-xs text-slate-300">
                  <p className="font-bold text-indigo-400 mb-1">Solution Reasoning:</p>
                  <LatexRenderer text={q.solution_text} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  // Active Test In Progress View
  return (
    <div className="max-w-7xl mx-auto py-4 px-4 space-y-4">
      {/* Test Header Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-600 text-white">
            {selectedExam.replace('_', ' ')}
          </span>
          <span className="text-xs font-semibold text-slate-300">
            Question {currentIndex + 1} of {activeTestQuestions.length}
          </span>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700/80 font-mono text-sm font-bold text-amber-400">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>

        <button
          onClick={submitTest}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          Submit Test
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Main Question Display */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800 min-h-[420px] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-indigo-400">
                  Q.{currentIndex + 1} [{currentQ?.question_type}]
                </span>
                <span className="text-[11px] uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                  {currentQ?.difficulty}
                </span>
              </div>

              {/* Problem statement */}
              <div className="text-sm md:text-base text-slate-100 leading-relaxed">
                {currentQ && <LatexRenderer text={currentQ.question_text} />}
              </div>

              {/* Options */}
              {currentQ?.question_type === 'MCQ' && currentQ.options && (
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt) => {
                    const isSelected = userAnswers[currentQ.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(currentQ.id, opt.id)}
                        className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs md:text-sm font-medium transition ${
                          isSelected
                            ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className={`w-6 h-6 flex-shrink-0 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {opt.id}
                        </span>
                        <div className="flex-1 pt-0.5">
                          <LatexRenderer text={opt.text} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numerical */}
              {currentQ?.question_type === 'NUMERICAL' && (
                <div className="pt-2 space-y-2">
                  <label className="text-xs text-slate-400 font-semibold">Enter Numerical Answer:</label>
                  <input
                    type="text"
                    value={userAnswers[currentQ.id] || ''}
                    onChange={(e) => handleNumericalInput(currentQ.id, e.target.value)}
                    placeholder="e.g. 15.25"
                    className="w-48 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReviewFlag(currentQ.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    reviewFlags[currentQ.id]
                      ? 'bg-purple-950/60 text-purple-300 border-purple-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {reviewFlags[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
                </button>

                <button
                  onClick={() => clearResponse(currentQ.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={() => {
                    if (currentIndex < activeTestQuestions.length - 1) {
                      setCurrentIndex((prev) => prev + 1);
                    }
                  }}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow"
                >
                  Save & Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Question Navigation Palette */}
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-4 shadow-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
              Question Palette
            </h4>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-600" />
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
                <span>Not Answered</span>
              </div>
            </div>

            {/* Grid Palette Buttons */}
            <div className="grid grid-cols-5 gap-1.5 pt-2">
              {activeTestQuestions.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!reviewFlags[q.id];
                const isCurrent = currentIndex === idx;

                let btnClass = 'bg-slate-900 border-slate-800 text-slate-400';
                if (isCurrent) {
                  btnClass = 'ring-2 ring-indigo-400 font-bold bg-slate-800 text-white';
                } else if (isFlagged) {
                  btnClass = 'bg-purple-600 text-white';
                } else if (isAnswered) {
                  btnClass = 'bg-emerald-600 text-white';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-mono font-bold flex items-center justify-center border transition ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
