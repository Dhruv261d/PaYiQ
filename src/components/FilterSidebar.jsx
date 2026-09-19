import React from 'react';
import { 
  Filter, 
  Search, 
  RotateCcw, 
  BookOpen, 
  GraduationCap, 
  Tag, 
  Layers, 
  Atom, 
  FlaskConical, 
  Pi, 
  Dna,
  Check
} from 'lucide-react';
import { EXAMS, SUBJECTS, CHAPTERS, TOPICS } from '../data/taxonomy';

const SUBJECT_ICONS = {
  physics: Atom,
  chemistry: FlaskConical,
  mathematics: Pi,
  biology: Dna,
};

export default function FilterSidebar({
  filters,
  setFilters,
  totalResults = 0,
  resetFilters
}) {
  // Filter chapters based on subject and classLevel
  const filteredChapters = CHAPTERS.filter((ch) => {
    if (filters.subjectId !== 'ALL' && ch.subjectId !== filters.subjectId) return false;
    if (filters.classLevel !== 'ALL' && ch.classLevel !== parseInt(filters.classLevel)) return false;
    return true;
  });

  // Filter topics based on selected chapter
  const filteredTopics = TOPICS.filter((top) => {
    if (filters.chapterId !== 'ALL' && top.chapterId !== filters.chapterId) return false;
    return true;
  });

  const handleSubjectChange = (subjId) => {
    setFilters({
      ...filters,
      subjectId: subjId,
      chapterId: 'ALL',
      topicId: 'ALL',
    });
  };

  const handleClassChange = (classLvl) => {
    setFilters({
      ...filters,
      classLevel: classLvl,
      chapterId: 'ALL',
      topicId: 'ALL',
    });
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-4 no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-5">
        
        {/* Header & Reset */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            <h2 className="font-bold text-slate-100 text-sm">Parametric Filter</h2>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-400 font-medium transition"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Search Bar */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Search className="w-3 h-3 text-slate-400" />
            Keyword / Equation Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="e.g. Moment of Inertia, Integral, Sn2..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Target Examination */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            Target Exam
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilters({ ...filters, exam: 'ALL' })}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filters.exam === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Exams
            </button>
            {EXAMS.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setFilters({ ...filters, exam: ex.id })}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  filters.exam === ex.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {ex.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            Subject
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => handleSubjectChange('ALL')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition ${
                filters.subjectId === 'ALL'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              All Subjects
            </button>
            {SUBJECTS.map((sub) => {
              const Icon = SUBJECT_ICONS[sub.id] || BookOpen;
              const isSelected = filters.subjectId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubjectChange(sub.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Class Level */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Class Level
          </label>
          <div className="flex gap-1.5">
            {['ALL', '11', '12'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleClassChange(lvl)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition ${
                  filters.classLevel === lvl
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lvl === 'ALL' ? 'All Classes' : `Class ${lvl}`}
              </button>
            ))}
          </div>
        </div>

        {/* Cascading Chapter Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Chapter
            </span>
            <span className="text-[10px] text-slate-500">{filteredChapters.length} available</span>
          </label>
          <select
            value={filters.chapterId}
            onChange={(e) => setFilters({ ...filters, chapterId: e.target.value, topicId: 'ALL' })}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Chapters</option>
            {filteredChapters.map((chap) => (
              <option key={chap.id} value={chap.id}>
                [{chap.classLevel}th] {chap.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cascading Topic Selector */}
        {filteredTopics.length > 0 && (
          <div className="space-y-1.5 animate-in fade-in duration-200">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-rose-400" />
              Micro-Topic / Concept
            </label>
            <select
              value={filters.topicId}
              onChange={(e) => setFilters({ ...filters, topicId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Sub-Topics</option>
              {filteredTopics.map((top) => (
                <option key={top.id} value={top.id}>
                  {top.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Year Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Exam Year
          </label>
          <div className="grid grid-cols-4 gap-1">
            {['ALL', '2024', '2023', '2022'].map((yr) => (
              <button
                key={yr}
                onClick={() => setFilters({ ...filters, year: yr })}
                className={`py-1 rounded-md text-xs font-semibold transition ${
                  filters.year === yr
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty & Type */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Difficulty
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Question Type
            </label>
            <select
              value={filters.questionType}
              onChange={(e) => setFilters({ ...filters, questionType: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="MCQ">MCQ</option>
              <option value="NUMERICAL">Numerical</option>
            </select>
          </div>
        </div>

        {/* Results Badge */}
        <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-2.5 text-center">
          <span className="text-xs text-slate-300">Matching Questions: </span>
          <span className="text-xs font-mono font-bold text-indigo-400">{totalResults}</span>
        </div>

      </div>
    </aside>
  );
}
