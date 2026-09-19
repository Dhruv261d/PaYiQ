import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  RotateCcw, 
  BookOpen, 
  Tag, 
  Lightbulb, 
  Save, 
  Atom, 
  FlaskConical, 
  Pi, 
  Dna,
  FolderCheck,
  Eye,
  EyeOff,
  Grid,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import LatexRenderer from './LatexRenderer';
import { CHAPTERS, SUBJECTS } from '../data/taxonomy';

const SUBJECT_ICONS = {
  physics: Atom,
  chemistry: FlaskConical,
  mathematics: Pi,
  biology: Dna,
};

export default function SegregatedResults({
  segregatedData,
  onReset,
  onSaveToLibrary,
  isAlreadySaved = false,
}) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('ALL');
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  // PDF Export & Answer Display Configurations
  const [answerMode, setAnswerMode] = useState('solutions'); // 'solutions', 'hidden', 'grid'
  const [printLayout, setPrintLayout] = useState('one_column'); // 'one_column' or 'two_column'
  const [customHeader, setCustomHeader] = useState('');
  const [showPrintSettings, setShowPrintSettings] = useState(false);

  const { paperTitle, exam, year, granularity, questions = [] } = segregatedData;

  // Group questions by Chapter
  const chapterGroups = {};
  questions.forEach((q) => {
    const chapId = q.chapter_id || 'unclassified';
    if (!chapterGroups[chapId]) {
      chapterGroups[chapId] = [];
    }
    chapterGroups[chapId].push(q);
  });

  const distinctChapterIds = Object.keys(chapterGroups);

  // Filter chapters by selected subject
  const filteredChapterIds = distinctChapterIds.filter((chapId) => {
    if (selectedSubjectFilter === 'ALL') return true;
    const chap = CHAPTERS.find((c) => c.id === chapId);
    return chap ? chap.subjectId === selectedSubjectFilter : true;
  });

  const toggleSolution = (qId) => {
    setExpandedSolutions({ ...expandedSolutions, [qId]: !expandedSolutions[qId] });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleSave = () => {
    onSaveToLibrary(segregatedData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & Action Controls (Hidden in Print) */}
      <div className="card-light rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-slate-200 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200">
              <FolderCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900">{paperTitle}</h2>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {exam.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Organized into <strong>{distinctChapterIds.length} NCERT Chapters</strong> ({questions.length} total questions extracted).
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Segregate Another
            </button>

            <button
              onClick={handleSave}
              disabled={isAlreadySaved || savedSuccess}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition ${
                isAlreadySaved || savedSuccess
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-white hover:bg-slate-50 text-indigo-600 border-indigo-200 shadow-sm'
              }`}
            >
              {isAlreadySaved || savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Saved to Library
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save to Library
                </>
              )}
            </button>

            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Answer Mode Selector & PDF Config Bar */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Answer & Solution Mode:</span>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                <button
                  onClick={() => setAnswerMode('solutions')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    answerMode === 'solutions'
                      ? 'bg-indigo-600 text-white shadow-xs'
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
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Without Answers (Question Sheet)</span>
                </button>

                <button
                  onClick={() => setAnswerMode('grid')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    answerMode === 'grid'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Detachable Answer Key at End</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowPrintSettings(!showPrintSettings)}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showPrintSettings ? 'Hide Options' : 'PDF Layout Options'}
            </button>
          </div>

          {/* Expanded PDF Settings */}
          {showPrintSettings && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Custom Sheet Header / Institute Watermark</label>
                <input
                  type="text"
                  value={customHeader}
                  onChange={(e) => setCustomHeader(e.target.value)}
                  placeholder="e.g. Master Coaching Academy • Class 12 Batch"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">PDF Print Column Layout</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPrintLayout('one_column')}
                    className={`flex-1 py-1.5 rounded-xl font-bold border transition ${
                      printLayout === 'one_column'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    1-Column Standard
                  </button>
                  <button
                    onClick={() => setPrintLayout('two_column')}
                    className={`flex-1 py-1.5 rounded-xl font-bold border transition ${
                      printLayout === 'two_column'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    2-Column Balanced
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedSubjectFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedSubjectFilter === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Chapters ({distinctChapterIds.length})
            </button>
            {SUBJECTS.map((sub) => {
              const Icon = SUBJECT_ICONS[sub.id] || BookOpen;
              const isSelected = selectedSubjectFilter === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubjectFilter(sub.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-slate-500 font-mono">
            Granularity: <span className="text-indigo-600">{granularity === 'chapter_topic' ? 'Chapter & Sub-Topics' : 'Chapter Level'}</span>
          </div>
        </div>

      </div>

      {/* ====================================================================
          PRINT-ONLY CLEAN HEADER
          ==================================================================== */}
      <div className="hidden print:block text-slate-900 border-b-2 border-slate-900 pb-3 mb-6">
        {customHeader && (
          <h3 className="text-xs font-bold text-center uppercase tracking-wider text-slate-600 mb-1">
            {customHeader}
          </h3>
        )}
        <h1 className="text-xl font-black uppercase text-center">{paperTitle}</h1>
        <div className="flex justify-between text-[10px] font-semibold text-slate-600 pt-2 border-t border-slate-200 mt-2">
          <span>Target: {exam.replace('_', ' ')} ({year})</span>
          <span>Total Questions: {questions.length}</span>
          <span>Mode: {answerMode === 'solutions' ? 'With Full Solutions' : (answerMode === 'hidden' ? 'Question Sheet Only' : 'Questions + End Answer Key')}</span>
        </div>
      </div>

      {/* ====================================================================
          CHAPTER-WISE GROUPED STREAM
          ==================================================================== */}
      <div className={`space-y-6 ${printLayout === 'two_column' ? 'print-two-column' : ''}`}>
        {filteredChapterIds.map((chapId) => {
          const chapObj = CHAPTERS.find((c) => c.id === chapId);
          const chapQuestions = chapterGroups[chapId];
          const chapName = chapObj ? chapObj.name : 'Unclassified Questions';
          const classLvl = chapObj ? `Class ${chapObj.classLevel}th` : '';
          const unit = chapObj ? chapObj.unit : '';

          // Sub-group by Topic if topic granularity is active
          const topicSubGroups = {};
          chapQuestions.forEach((q) => {
            const top = q.topic_name || 'General Concept';
            if (!topicSubGroups[top]) topicSubGroups[top] = [];
            topicSubGroups[top].push(q);
          });

          return (
            <section
              key={chapId}
              className="card-light rounded-3xl p-6 md:p-8 border border-slate-200 space-y-6 shadow-sm print:p-0 print:border-none print:shadow-none print-page-break"
            >
              
              {/* Chapter Header Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 print:border-b-2 print:border-slate-900">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {classLvl && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 print:text-slate-800 print:bg-slate-100">
                        {classLvl}
                      </span>
                    )}
                    {unit && (
                      <span className="text-[10px] font-semibold text-slate-500 print:text-slate-600">
                        Unit: {unit}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900">
                    {chapName}
                  </h3>
                </div>

                <div className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold">
                  {chapQuestions.length} Questions
                </div>
              </div>

              {/* Topic Breakdown / Questions */}
              {granularity === 'chapter_topic' ? (
                <div className="space-y-6">
                  {Object.entries(topicSubGroups).map(([topicName, topQuestions]) => (
                    <div key={topicName} className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 border-l-2 border-emerald-500 pl-2">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Topic: {topicName}</span>
                        <span className="text-[10px] font-normal text-slate-500">
                          ({topQuestions.length} {topQuestions.length === 1 ? 'question' : 'questions'})
                        </span>
                      </div>

                      <div className="space-y-4 pl-0 sm:pl-2">
                        {topQuestions.map((q, qIdx) => renderQuestionItem(q, qIdx))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {chapQuestions.map((q, qIdx) => renderQuestionItem(q, qIdx))}
                </div>
              )}

            </section>
          );
        })}
      </div>

      {/* ====================================================================
          DETACHABLE ANSWER KEY GRID ON FINAL PAGE (If Mode is 'grid')
          ==================================================================== */}
      {answerMode === 'grid' && (
        <div className="card-light rounded-3xl p-6 md:p-8 space-y-4 border border-slate-200 print:border-t-2 print:border-slate-900 print-page-break">
          <h3 className="text-sm font-black uppercase tracking-wider text-center text-slate-900">
            --- ANSWER KEY GRID (DETACHABLE) ---
          </h3>
          <p className="text-xs text-slate-500 text-center">
            Answer key for {paperTitle}
          </p>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2 text-center text-xs">
            {questions.map((q, idx) => (
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

  function renderQuestionItem(q, qIdx) {
    const isSolutionOpen = expandedSolutions[q.id] || answerMode === 'solutions';

    return (
      <div
        key={q.id}
        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 print:border print:border-slate-300 print-avoid-break print:mb-4"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-mono font-bold text-indigo-700">
            Q.{qIdx + 1} [{q.question_type}]
          </span>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
            {q.difficulty}
          </span>
        </div>

        {/* Problem statement with LaTeX */}
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

        {/* Answer Key Row (Only shown if NOT 'hidden' mode) */}
        {answerMode !== 'hidden' && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <div className="text-xs">
              <span className="text-slate-500">Correct Answer: </span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                ({q.correct_answer})
              </span>
            </div>

            {/* Toggle Solution Button (Hidden in Print) */}
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

        {/* Inline Solution Box (Shown if 'solutions' mode is active or user expanded) */}
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

        {/* User toggled solution in other modes */}
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
  }
}
