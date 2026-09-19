import React, { useState } from 'react';
import { 
  Layers, 
  Calendar, 
  Download, 
  Sparkles, 
  ArrowRight, 
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { EXAMS, EXAM_CATEGORIES } from '../data/taxonomy';

export default function ShiftArchive({ onSelectShiftForSegregation }) {
  const [selectedExam, setSelectedExam] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Curated list of shift papers across competitive exams
  const shiftPapers = [
    {
      id: 'shift-jee-2024-jan-29-s1',
      exam: 'JEE_MAIN',
      year: 2024,
      title: 'JEE Main 2024 Session 1 (29 Jan Shift 1)',
      totalQuestions: 90,
      subjects: 'Physics (30), Chemistry (30), Maths (30)',
      date: '29 January 2024',
      status: 'Ready for AI Segregation',
      sampleText: `[QUESTION 1 - PHYSICS] A solid cylinder mass M=2kg radius R=0.2m...
[QUESTION 2 - CHEMISTRY] According to Molecular Orbital Theory (MOT)...
[QUESTION 3 - MATHS] The value of definite integral int_0^(pi/2)...`
    },
    {
      id: 'shift-jee-2024-jan-30-s2',
      exam: 'JEE_MAIN',
      year: 2024,
      title: 'JEE Main 2024 Session 1 (30 Jan Shift 2)',
      totalQuestions: 90,
      subjects: 'Physics (30), Chemistry (30), Maths (30)',
      date: '30 January 2024',
      status: 'Ready for AI Segregation',
      sampleText: `[QUESTION 1 - PHYSICS] The threshold frequency for a photosensitive metal...
[QUESTION 2 - CHEMISTRY] Calculate the standard cell potential for Galvanic cell...`
    },
    {
      id: 'shift-neet-2024-ug',
      exam: 'NEET',
      year: 2024,
      title: 'NEET UG 2024 Official Shift Paper',
      totalQuestions: 180,
      subjects: 'Biology (90), Physics (45), Chemistry (45)',
      date: '05 May 2024',
      status: 'Ready for AI Segregation',
      sampleText: `[QUESTION 1 - BIOLOGY] In a dihybrid test cross between heterozygous tall plant...
[QUESTION 2 - CHEMISTRY] Which compound undergoes self-Cannizzaro reaction...`
    },
    {
      id: 'shift-mht-cet-2024-may-10',
      exam: 'MHT_CET',
      year: 2024,
      title: 'MHT-CET 2024 PCM Shift 1 (10 May)',
      totalQuestions: 150,
      subjects: 'Mathematics (50), Physics (50), Chemistry (50)',
      date: '10 May 2024',
      status: 'Ready for AI Segregation',
      sampleText: `[QUESTION 1 - PHYSICS] The ratio of rotational kinetic energy for circular ring...
[QUESTION 2 - MATHS] If A is a non-singular square matrix order 3x3 with |A|=5...`
    },
    {
      id: 'shift-upsc-2024-prelims-csat',
      exam: 'UPSC_CSE',
      year: 2024,
      title: 'UPSC Civil Services 2024 (Prelims Paper II CSAT)',
      totalQuestions: 80,
      subjects: 'Reading Comprehension & Logical Reasoning (80)',
      date: '16 June 2024',
      status: 'Ready for AI Segregation',
      sampleText: `[QUESTION 1 - LOGICAL] Statement: Some fruits are sweet. Conclusion...`
    },
  ];

  const filteredShifts = shiftPapers.filter((s) => {
    if (selectedExam !== 'ALL' && s.exam !== selectedExam) return false;
    if (selectedYear !== 'ALL' && s.year !== parseInt(selectedYear)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.exam.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="card-light rounded-3xl p-6 md:p-8 space-y-4 shadow-xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">Shift-Wise Question Paper Archive</h2>
              <p className="text-xs text-slate-500">
                Browse official shift papers year-wise and 1-click segregate them into chapter banks.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold"
            >
              <option value="ALL">All Examinations</option>
              {EXAMS.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold"
            >
              <option value="ALL">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Search Paper</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Jan 29, NEET 2024..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shift Paper Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredShifts.map((shift) => (
          <div
            key={shift.id}
            className="card-light rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {shift.exam.replace('_', ' ')}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {shift.date}
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold">
                  • {shift.totalQuestions} Questions
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">
                {shift.title}
              </h3>

              <p className="text-xs text-slate-500">
                Subject Distribution: <span className="text-slate-700 font-medium">{shift.subjects}</span>
              </p>
            </div>

            <button
              onClick={() => onSelectShiftForSegregation(shift)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Segregate with AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
