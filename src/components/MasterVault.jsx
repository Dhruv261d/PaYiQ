import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Filter, 
  Tag, 
  Lightbulb, 
  Eye, 
  EyeOff, 
  Grid, 
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import LatexRenderer from './LatexRenderer';
import { EXAMS, EXAM_CATEGORIES, SUBJECTS, CHAPTERS, TOPICS } from '../data/taxonomy';
import { SEED_QUESTIONS } from '../data/seedQuestions';

export default function MasterVault({ onRequireAuth, currentUser }) {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedExam, setSelectedExam] = useState('JEE_MAIN');
  const [selectedSubject, setSelectedSubject] = useState('physics');
  const [selectedChapter, setSelectedChapter] = useState('phy_11_rotational');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Answer & PDF Mode
  const [answerMode, setAnswerMode] = useState('solutions'); // 'solutions', 'hidden', 'grid'
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Filter exams by category
  const filteredExams = useMemo(() => {
    if (selectedCategory === 'ALL') return EXAMS;
    return EXAMS.filter(e => e.category === selectedCategory);
  }, [selectedCategory]);

  // Filter chapters by subject
  const filteredChapters = useMemo(() => {
    return CHAPTERS.filter(c => c.subjectId === selectedSubject);
  }, [selectedSubject]);

  // Filter topics by chapter
  const filteredTopics = useMemo(() => {
    return TOPICS.filter(t => t.chapterId === selectedChapter);
  }, [selectedChapter]);

  // Active Questions pool
  const matchedQuestions = useMemo(() => {
    return SEED_QUESTIONS.filter((q) => {
      if (selectedExam !== 'ALL' && q.exam !== selectedExam) return false;
      if (selectedSubject !== 'ALL' && q.subject_id !== selectedSubject) return false;
      if (selectedChapter !== 'ALL' && q.chapter_id !== selectedChapter) return false;
      if (selectedTopic !== 'ALL' && q.topic_id !== selectedTopic) return false;
      if (searchQuery.trim()) {
        const text = (q.question_text + ' ' + (q.solution_text || '')).toLowerCase();
        if (!text.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [selectedExam, selectedSubject, selectedChapter, selectedTopic, searchQuery]);

  const toggleSolution = (id) => {
    setExpandedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadPdf = () => {
    if (!currentUser) {
      onRequireAuth('Please sign in to download chapter-wise PYQ PDFs.');
      return;
    }
    window.print();
  };

  const currentChapterObj = CHAPTERS.find(c => c.id === selectedChapter);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="card-light rounded-3xl p-6 md:p-8 space-y-5 shadow-xl border border-slate-200 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900">Master PYQ Chapter & Topic Vault</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Pre-Segregated Database
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Directly explore past year questions by <strong>Exam, Subject, Chapter, & Topic</strong> with instant LaTeX formulas.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition"
          >
            <Download className="w-4 h-4" />
            Download Chapter PDF
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Exam Category:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { setSelectedCategory('ALL'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {EXAM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cascading Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          
          {/* 1. Exam */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Target Examination</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold"
            >
              <option value="ALL">All Competitive Exams</option>
              {filteredExams.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
          </div>

          {/* 2. Subject */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                const ch = CHAPTERS.find(c => c.subjectId === e.target.value);
                if (ch) setSelectedChapter(ch.id);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold"
            >
              {SUBJECTS.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          {/* 3. Chapter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">NCERT Chapter</label>
            <select
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setSelectedTopic('ALL');
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold truncate"
            >
              {filteredChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>[{ch.classLevel}th] {ch.name}</option>
              ))}
            </select>
          </div>

          {/* 4. Micro-Topic */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Sub-Topic / Concept</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold truncate"
            >
              <option value="ALL">All Micro-Topics</option>
              {filteredTopics.map((top) => (
                <option key={top.id} value={top.id}>{top.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Answer Mode Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Answer Mode:</span>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setAnswerMode('solutions')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  answerMode === 'solutions'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>With Solutions</span>
              </button>

              <button
                onClick={() => setAnswerMode('hidden')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  answerMode === 'hidden'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Without Answers</span>
              </button>

              <button
                onClick={() => setAnswerMode('grid')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  answerMode === 'grid'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Detachable Key at End</span>
              </button>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-500 font-mono">
            Matching Questions: <span className="font-bold text-indigo-600">{matchedQuestions.length}</span>
          </div>
        </div>

      </div>

      {/* ====================================================================
          MINIMALIST PRINT-ONLY CLEAN HEADER
          ==================================================================== */}
      <div className="hidden print:block text-slate-900 border-b-2 border-slate-900 pb-3 mb-6">
        <h1 className="text-xl font-black uppercase text-center">
          {currentChapterObj?.name || 'Chapter Question Bank'} • Previous Year Questions
        </h1>
        <div className="flex justify-between text-[10px] font-semibold text-slate-600 pt-2 border-t border-slate-200 mt-2">
          <span>Target: {selectedExam.replace('_', ' ')}</span>
          <span>Chapter: {currentChapterObj?.name}</span>
          <span>Questions: {matchedQuestions.length}</span>
          <span>Mode: {answerMode === 'solutions' ? 'With Solutions' : (answerMode === 'hidden' ? 'Question Paper Sheet' : 'With Detachable Answer Grid')}</span>
        </div>
      </div>

      {/* ====================================================================
          QUESTION STREAM (MINIMALIST AUTHENTIC PYQ FORMAT)
          ==================================================================== */}
      {matchedQuestions.length === 0 ? (
        <div className="card-light rounded-3xl p-12 text-center space-y-3 no-print">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Questions Found for this Specific Combination</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching the exam or sub-topic filter above, or use the <strong>AI Segregator</strong> to ingest a new shift paper.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {matchedQuestions.map((q, idx) => {
            const isSolutionOpen = expandedSolutions[q.id] || answerMode === 'solutions';

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3 print:border print:border-slate-300 print:break-inside-avoid print:mb-4"
              >
                {/* Minimalist PYQ Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-900">
                      Q.{idx + 1}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-indigo-700 border border-slate-200">
                      [{q.exam.replace('_', ' ')} {q.year} {q.session_shift ? `• ${q.session_shift}` : ''}]
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                    {q.difficulty}
                  </span>
                </div>

                {/* Problem statement */}
                <div className="text-xs md:text-sm text-slate-900 leading-relaxed font-normal">
                  <LatexRenderer text={q.question_text} />
                </div>

                {/* MCQ Options */}
                {q.question_type === 'MCQ' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                      >
                        <span className="font-mono font-bold text-indigo-700">
                          ({opt.id})
                        </span>
                        <div className="flex-1">
                          <LatexRenderer text={opt.text} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Answer Row (If not hidden mode) */}
                {answerMode !== 'hidden' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div className="text-xs">
                      <span className="text-slate-500">Correct Answer: </span>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        ({q.correct_answer})
                      </span>
                    </div>

                    {answerMode !== 'solutions' && (
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline no-print"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        {isSolutionOpen ? 'Hide Solution' : 'View Step-by-Step Solution'}
                      </button>
                    )}
                  </div>
                )}

                {/* Inline Solution Box */}
                {answerMode === 'solutions' && (
                  <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-1 mt-2">
                    <div className="font-bold text-indigo-800 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Step-by-Step Mathematical Solution:</span>
                    </div>
                    <div className="text-slate-700 leading-relaxed pt-1">
                      <LatexRenderer text={q.solution_text} />
                    </div>
                  </div>
                )}

                {/* Toggled solution */}
                {answerMode !== 'solutions' && isSolutionOpen && (
                  <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-1 mt-2 no-print">
                    <div className="font-bold text-indigo-800">Mathematical Solution:</div>
                    <div className="text-slate-700 leading-relaxed">
                      <LatexRenderer text={q.solution_text} />
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          DETACHABLE ANSWER KEY GRID ON FINAL PAGE (Mode: 'grid')
          ==================================================================== */}
      {answerMode === 'grid' && matchedQuestions.length > 0 && (
        <div className="card-light rounded-3xl p-6 md:p-8 space-y-4 border border-slate-200 print:border-t-2 print:border-slate-900 print:page-break-before">
          <h3 className="text-sm font-black uppercase tracking-wider text-center text-slate-900">
            --- ANSWER KEY GRID (DETACHABLE) ---
          </h3>
          <p className="text-xs text-slate-500 text-center">
            {currentChapterObj?.name} • {selectedExam.replace('_', ' ')}
          </p>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2 text-center text-xs">
            {matchedQuestions.map((q, idx) => (
              <div key={q.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold">Q.{idx + 1}</div>
                <div className="font-mono font-bold text-indigo-700 text-sm mt-0.5">{q.correct_answer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
