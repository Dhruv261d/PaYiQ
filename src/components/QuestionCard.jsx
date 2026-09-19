import React, { useState } from 'react';
import { 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Plus, 
  Check, 
  Copy, 
  Share2, 
  Lightbulb, 
  AlertCircle,
  HelpCircle,
  Hash
} from 'lucide-react';
import LatexRenderer from './LatexRenderer';
import { CHAPTERS, SUBJECTS } from '../data/taxonomy';

export default function QuestionCard({
  question,
  index,
  isBookmarked = false,
  onToggleBookmark,
  isSelectedForDPP = false,
  onToggleDPPSelection,
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedUserOption, setSelectedUserOption] = useState(null);

  const chapterObj = CHAPTERS.find((c) => c.id === question.chapter_id);
  const subjectObj = SUBJECTS.find((s) => s.id === question.subject_id);

  const difficultyColors = {
    EASY: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    HARD: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  const examColors = {
    JEE_MAIN: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    JEE_ADVANCED: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    NEET: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    MHT_CET: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    BITSAT: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(question.question_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="glass-panel rounded-2xl p-5 md:p-6 shadow-xl transition-all duration-200 hover:border-slate-700/80 space-y-4">
      
      {/* Top Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Question Index Badge */}
          <span className="flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
            <Hash className="w-3 h-3 text-slate-400" />
            {index + 1}
          </span>

          {/* Exam Tag */}
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${examColors[question.exam] || 'bg-slate-800 text-slate-300'}`}>
            {question.exam.replace('_', ' ')}
          </span>

          {/* Year & Shift */}
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300">
            {question.year} {question.session_shift ? `• ${question.session_shift}` : ''}
          </span>

          {/* Chapter Badge */}
          {chapterObj && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/50 text-indigo-300 border border-indigo-500/20">
              {chapterObj.name}
            </span>
          )}
        </div>

        {/* Right Badges: Type & Difficulty */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${difficultyColors[question.difficulty] || 'bg-slate-800 text-slate-400'}`}>
            {question.difficulty}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
            {question.question_type}
          </span>
        </div>
      </div>

      {/* Question Problem Statement (LaTeX Powered) */}
      <div className="text-slate-100 text-sm md:text-base font-normal leading-relaxed">
        <LatexRenderer text={question.question_text} />
      </div>

      {/* Diagram Attachment (if exists) */}
      {question.diagram_url && (
        <div className="my-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center">
          <img
            src={question.diagram_url}
            alt="Question Diagram"
            className="max-h-60 object-contain rounded-lg shadow"
          />
          {question.diagram_description && (
            <p className="text-[11px] text-slate-400 mt-2 text-center italic">
              {question.diagram_description}
            </p>
          )}
        </div>
      )}

      {/* Options List (for MCQ) */}
      {question.question_type === 'MCQ' && question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
          {question.options.map((opt) => {
            const isChosen = selectedUserOption === opt.id;
            const isCorrect = showSolution && opt.id === question.correct_answer;
            const isWrongChosen = showSolution && isChosen && opt.id !== question.correct_answer;

            let optionStyle = 'bg-slate-950/70 border-slate-800/80 hover:border-indigo-500/50 text-slate-200';
            if (isChosen && !showSolution) {
              optionStyle = 'bg-indigo-950/50 border-indigo-500 text-indigo-200';
            } else if (isCorrect) {
              optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm';
            } else if (isWrongChosen) {
              optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
            }

            return (
              <button
                key={opt.id}
                onClick={() => setSelectedUserOption(opt.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left text-xs md:text-sm font-medium transition duration-150 ${optionStyle}`}
              >
                <span className={`w-6 h-6 flex-shrink-0 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition ${
                  isCorrect
                    ? 'bg-emerald-500 text-slate-950'
                    : (isChosen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300')
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

      {/* Numerical Answer Prompt (for Numerical Type) */}
      {question.question_type === 'NUMERICAL' && (
        <div className="pt-2 flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Numerical Answer:</span>
          {showSolution ? (
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
              Answer: {question.correct_answer}
            </span>
          ) : (
            <span className="text-xs font-mono text-slate-500 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
              [Click Show Solution to Reveal]
            </span>
          )}
        </div>
      )}

      {/* Solution Accordion */}
      {showSolution && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Step-by-Step Mathematical Solution
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              Correct Answer: ({question.correct_answer})
            </span>
          </div>
          <div className="text-xs md:text-sm text-slate-200 pt-1 leading-relaxed">
            <LatexRenderer text={question.solution_text || 'No step-by-step solution provided.'} />
          </div>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
        
        {/* Toggle Solution Button */}
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
            showSolution
              ? 'bg-slate-800 text-slate-200'
              : 'bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30'
          }`}
        >
          {showSolution ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Solution
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Show Detailed Solution
            </>
          )}
        </button>

        {/* Right Tools */}
        <div className="flex items-center gap-1.5">
          {/* Add to DPP Worksheet Selection */}
          <button
            onClick={() => onToggleDPPSelection(question.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
              isSelectedForDPP
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-700/60'
            }`}
            title="Add to Daily Practice Problem (DPP) Worksheet"
          >
            {isSelectedForDPP ? (
              <>
                <Check className="w-3.5 h-3.5" />
                In DPP
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                Add to DPP
              </>
            )}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(question.id)}
            className={`p-1.5 rounded-lg border transition ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-850 hover:bg-slate-800 text-slate-400 border-slate-700/60'
            }`}
            title="Bookmark Question"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          {/* Copy Statement */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 border border-slate-700/60 transition"
            title="Copy LaTeX Statement"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

      </div>

    </article>
  );
}
