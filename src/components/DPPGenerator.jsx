import React, { useState } from 'react';
import { 
  Printer, 
  Settings, 
  Trash2, 
  Sparkles, 
  FileDown, 
  CheckSquare, 
  Square,
  BookOpen,
  Layers,
  GraduationCap
} from 'lucide-react';
import LatexRenderer from './LatexRenderer';

export default function DPPGenerator({
  selectedQuestions = [],
  allQuestions = [],
  onRemoveQuestion,
  onClearAll,
  onAddAutoQuestions
}) {
  const [instituteName, setInstituteName] = useState('PaYiQ Master Coaching Academy');
  const [dppTitle, setDppTitle] = useState('Daily Practice Problem (DPP) - JEE & NEET Physics Special');
  const [targetBatch, setTargetBatch] = useState('Class 11 & 12 Advanced Batch');
  const [maxMarks, setMaxMarks] = useState(selectedQuestions.length * 4);
  const [timeAllowed, setTimeAllowed] = useState(`${selectedQuestions.length * 2} Minutes`);
  const [includeAnswerKeyGrid, setIncludeAnswerKeyGrid] = useState(true);
  const [includeDetailedSolutions, setIncludeDetailedSolutions] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleAutoPick = () => {
    onAddAutoQuestions(10);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      
      {/* Configuration & Controls Header (Hidden in Print) */}
      <div className="glass-panel rounded-3xl p-6 shadow-xl border border-slate-800 space-y-6 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">A4 Print-Ready DPP & Worksheet Generator</h2>
              <p className="text-xs text-slate-400">
                Balanced 2-column layout with coaching watermark & detachable answer key grid.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoPick}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold rounded-xl border border-indigo-500/30 transition"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Auto-Pick 10 Questions
            </button>

            {selectedQuestions.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1 px-3 py-2 bg-slate-900 hover:bg-rose-950/50 text-rose-400 text-xs font-semibold rounded-xl border border-slate-800 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Selection
              </button>
            )}

            <button
              onClick={handlePrint}
              disabled={selectedQuestions.length === 0}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF (A4)
            </button>
          </div>
        </div>

        {/* Customization Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Institute Name</label>
            <input
              type="text"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Sheet Title</label>
            <input
              type="text"
              value={dppTitle}
              onChange={(e) => setDppTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Batch / Target</label>
            <input
              type="text"
              value={targetBatch}
              onChange={(e) => setTargetBatch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3 pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={includeAnswerKeyGrid}
                onChange={(e) => setIncludeAnswerKeyGrid(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span>Answer Grid</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={includeDetailedSolutions}
                onChange={(e) => setIncludeDetailedSolutions(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span>Solutions</span>
            </label>
          </div>
        </div>
      </div>

      {/* Printable Sheet View (WYSIWYG Live Preview) */}
      {selectedQuestions.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-3 no-print">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Questions Selected for DPP</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse questions in the <strong>Study & Search</strong> tab and click "Add to DPP", or click "Auto-Pick 10 Questions" above.
          </p>
        </div>
      ) : (
        <div className="bg-white text-slate-950 rounded-2xl p-8 md:p-12 shadow-2xl space-y-6 print-page max-w-[210mm] mx-auto min-h-[297mm]">
          
          {/* Header Branding */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-slate-900">
              {instituteName}
            </h1>
            <h2 className="text-sm md:text-base font-bold text-slate-700">
              {dppTitle}
            </h2>
            <div className="flex flex-wrap items-center justify-between text-[11px] font-semibold text-slate-600 pt-2 border-t border-slate-200 mt-2">
              <span>Target: {targetBatch}</span>
              <span>Total Questions: {selectedQuestions.length}</span>
              <span>Max Marks: {selectedQuestions.length * 4}</span>
              <span>Time: {timeAllowed}</span>
            </div>
          </div>

          {/* 2-Column Balanced Questions Layout */}
          <div className="print-two-column text-slate-900 space-y-4">
            {selectedQuestions.map((q, idx) => (
              <div key={q.id} className="print-question-item text-xs space-y-2 relative group">
                
                {/* Delete button (hidden in print) */}
                <button
                  onClick={() => onRemoveQuestion(q.id)}
                  className="absolute right-0 top-0 text-rose-500 opacity-0 group-hover:opacity-100 transition no-print text-[10px]"
                  title="Remove from sheet"
                >
                  ✕
                </button>

                <div className="flex items-start gap-1 font-bold text-slate-900">
                  <span>Q.{idx + 1}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    [{q.exam.replace('_', ' ')} {q.year}]
                  </span>
                </div>

                <div className="text-slate-800 leading-relaxed">
                  <LatexRenderer text={q.question_text} />
                </div>

                {/* MCQ Options */}
                {q.question_type === 'MCQ' && q.options && (
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {q.options.map((opt) => (
                      <div key={opt.id} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <span className="font-bold">({opt.id})</span>
                        <div>
                          <LatexRenderer text={opt.text} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detachable Answer Key Grid */}
          {includeAnswerKeyGrid && (
            <div className="pt-8 mt-8 border-t-2 border-slate-900 break-inside-avoid">
              <h3 className="text-xs font-black uppercase tracking-wider text-center text-slate-900 mb-3">
                --- ANSWER KEY GRID (DETACHABLE) ---
              </h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center text-xs">
                {selectedQuestions.map((q, idx) => (
                  <div key={q.id} className="border border-slate-300 p-1.5 rounded">
                    <div className="text-[9px] text-slate-500 font-bold">Q.{idx + 1}</div>
                    <div className="font-mono font-bold text-slate-900">{q.correct_answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Solutions (Optional) */}
          {includeDetailedSolutions && (
            <div className="pt-8 mt-8 border-t-2 border-slate-900 break-before-page">
              <h3 className="text-sm font-black uppercase tracking-wider text-center text-slate-900 mb-4">
                DETAILED STEP-BY-STEP SOLUTIONS
              </h3>
              <div className="space-y-4 text-xs">
                {selectedQuestions.map((q, idx) => (
                  <div key={q.id} className="border-b border-slate-200 pb-3">
                    <div className="font-bold text-slate-900 mb-1">Q.{idx + 1} Solution:</div>
                    <div className="text-slate-700 leading-relaxed">
                      <LatexRenderer text={q.solution_text} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
