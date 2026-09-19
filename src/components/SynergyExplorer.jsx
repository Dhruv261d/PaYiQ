import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  Target
} from 'lucide-react';
import { CHAPTERS, EXAMS, SUBJECTS } from '../data/taxonomy';

export default function SynergyExplorer({ questions = [], onNavigateToChapter }) {
  const [selectedSubject, setSelectedSubject] = useState('physics');

  // Compute topic stats across exams
  const subjectChapters = CHAPTERS.filter((c) => c.subjectId === selectedSubject);

  const synergyMatrix = subjectChapters.map((chap) => {
    const chapterQuestions = questions.filter((q) => q.chapter_id === chap.id);
    const jeeCount = chapterQuestions.filter((q) => q.exam === 'JEE_MAIN').length;
    const neetCount = chapterQuestions.filter((q) => q.exam === 'NEET').length;
    const mhtCount = chapterQuestions.filter((q) => q.exam === 'MHT_CET').length;
    const totalCount = chapterQuestions.length;

    // Determine synergy benefit
    let recommendation = 'High Foundation Cross-Over';
    if (chap.unit.includes('Mechanics') || chap.unit.includes('Calculus') || chap.unit.includes('Physical Chemistry')) {
      recommendation = 'Ideal for MHT-CET students seeking JEE Main level conceptual depth';
    } else {
      recommendation = 'High yield for both Board & Entrance Exams';
    }

    return {
      ...chap,
      jeeCount,
      neetCount,
      mhtCount,
      totalCount,
      recommendation,
    };
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-amber-500 to-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-white">Cross-Exam Syllabus Synergy Matrix</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Concept Transfer
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Discover topic overlaps between JEE Main, NEET, and MHT-CET to maximize preparation efficiency.
            </p>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedSubject === sub.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* Strategic Advantage Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-indigo-500/20 rounded-2xl p-4 space-y-1.5 shadow">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
            <Target className="w-4 h-4" />
            MHT-CET Aspirants
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Practice <strong>Easy & Medium JEE Main questions</strong> of the same chapter to conquer the high-difficulty math/physics shift questions in CET.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-4 space-y-1.5 shadow">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <TrendingUp className="w-4 h-4" />
            NEET Medical Aspirants
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Gain speed & accuracy in <strong>Physics numericals</strong> by solving single-concept JEE Main direct formula questions.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-4 space-y-1.5 shadow">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Zap className="w-4 h-4" />
            JEE Main Aspirants
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Build rapid calculation stamina and warm up on formula applications using <strong>MHT-CET shift sets</strong>.
          </p>
        </div>
      </div>

      {/* Cross-Exam Topic Matrix Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          Chapter-Wise Concept Convergence
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {synergyMatrix.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-4 md:p-5 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                    Class {item.classLevel}th
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Unit: {item.unit}
                  </span>
                </div>
                <h4 className="text-sm md:text-base font-bold text-white">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item.recommendation}
                </p>
              </div>

              {/* Cross-Exam Distribution Pills & Action */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                    JEE: {item.jeeCount}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                    NEET: {item.neetCount}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
                    CET: {item.mhtCount}
                  </span>
                </div>

                <button
                  onClick={() => onNavigateToChapter(item.id, item.subjectId)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow transition"
                >
                  <span>Explore PYQs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
