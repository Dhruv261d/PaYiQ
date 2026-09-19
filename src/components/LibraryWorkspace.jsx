import React, { useState } from 'react';
import { 
  FolderCheck, 
  Search, 
  Trash2, 
  Download, 
  BookOpen, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function LibraryWorkspace({
  savedBanks = [],
  onOpenBank,
  onDeleteBank,
  onNavigateToSegregator
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBanks = savedBanks.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.paperTitle.toLowerCase().includes(q) ||
      b.exam.toLowerCase().includes(q) ||
      (b.questions && b.questions.some(item => (item.question_text || '').toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="card-light rounded-3xl p-6 md:p-8 space-y-4 shadow-xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">Saved Segregated Question Banks</h2>
              <p className="text-xs text-slate-500">
                Access, search, and download past segregated papers organized by chapter and topic.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToSegregator}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/20 transition"
          >
            <Sparkles className="w-4 h-4" />
            Segregate New Paper
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved papers by title, exam, or keyword..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-4 text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Saved Banks List */}
      {filteredBanks.length === 0 ? (
        <div className="card-light rounded-3xl p-12 text-center space-y-3">
          <FolderCheck className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Saved Question Banks Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload and segregate an exam paper, then click <strong>"Save to Library"</strong> to access it here anytime.
          </p>
          <button
            onClick={onNavigateToSegregator}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow transition"
          >
            Segregate Your First Paper →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBanks.map((bank) => {
            const questionCount = bank.questions ? bank.questions.length : 0;
            const uniqueChapters = new Set(bank.questions?.map(q => q.chapter_id) || []).size;

            return (
              <div
                key={bank.id}
                className="card-light rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {bank.exam.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {bank.year}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      • {uniqueChapters} Chapters ({questionCount} Qs)
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">
                    {bank.paperTitle}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Segregation Depth: <span className="text-slate-700 font-semibold">{bank.granularity === 'chapter_topic' ? 'Chapter & Topic Level' : 'Chapter Level'}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteBank(bank.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 transition"
                    title="Delete Saved Bank"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenBank(bank)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                  >
                    <span>View & Download PDF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
