import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  UploadCloud, 
  Layers, 
  FileText, 
  Download, 
  CheckCircle2, 
  Atom, 
  FlaskConical, 
  Pi, 
  Dna, 
  Zap, 
  GraduationCap, 
  Check, 
  BookOpen, 
  Cpu,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { EXAMS, CHAPTERS } from '../data/taxonomy';
import LatexRenderer from './LatexRenderer';

export default function LandingPage({ onLaunchApp, onOpenAuth }) {
  const [activeSubjectTab, setActiveSubjectTab] = useState('physics');
  const [openFaq, setOpenFaq] = useState(null);

  const subjectChapters = CHAPTERS.filter((c) => c.subjectId === activeSubjectTab).slice(0, 6);

  const faqs = [
    {
      q: 'How does PaYiQ segregate mixed question papers?',
      a: 'PaYiQ utilizes Google Gemini Flash multimodal models to extract every problem statement, convert math/chemistry equations into clean KaTeX LaTeX ($...$), and match each question strictly against our master NCERT syllabus tree.'
    },
    {
      q: 'Can I download the segregated questions as a PDF?',
      a: 'Yes! PaYiQ allows you to download clean, A4-formatted chapter-wise question banks with 3 flexible answer modes: With Full Solutions, Without Answers (clean student test sheet), or With a Detachable Answer Key Grid at the end.'
    },
    {
      q: 'Which examinations are supported?',
      a: 'PaYiQ comes pre-configured for JEE Main, JEE Advanced, NEET UG, MHT-CET, and BITSAT covering Physics, Chemistry, Mathematics, and Biology across Classes 11 & 12.'
    },
    {
      q: 'Is PaYiQ free for students?',
      a: 'Yes, students can segregate papers and download chapter-wise PDFs for free. We also offer Pro plans for coaching faculties and institutes.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* ====================================================================
          HERO SECTION
          ==================================================================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Background Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-200/50 via-purple-200/40 to-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Driven Competitive Exam PYQ Segregator</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Stop Searching Through 180-Question Shift Papers. <br />
            <span className="gradient-text">
              Practice Chapter-by-Chapter.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload raw mixed shift PDFs or images from <strong>JEE Main, NEET, & MHT-CET (and other competitive exams)</strong>. Our AI normalizes formulas into crisp LaTeX and instantly classifies every question into its exact NCERT chapter and topic.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Launch Segregator Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#how-it-works"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition"
            >
              How It Works →
            </a>
          </div>

          {/* Exam Trust Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-slate-400 font-medium">Supported Examinations:</span>
            {['JEE Main', 'NEET UG', 'MHT-CET', 'BITSAT', 'JEE Advanced', 'WBJEE / State CETs', 'Other Competitive Exams'].map((name, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs font-semibold">
                {name}
              </span>
            ))}
          </div>

        </div>

        {/* Interactive Live Visual Teaser */}
        <div className="mt-14 max-w-4xl mx-auto card-light rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/80 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-semibold text-slate-500 ml-2">PaYiQ AI Ingestion Pipeline</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Live Demo Preview
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Raw Input Side */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                Raw Monolithic Shift Paper (Mixed)
              </span>
              <div className="font-mono text-slate-600 bg-white p-3 rounded-xl border border-slate-200 text-[11px] leading-relaxed space-y-1.5 opacity-80">
                <p className="text-rose-600 font-semibold">Q1. (Physics) Solid cylinder mass M=2kg Free to rotate...</p>
                <p className="text-amber-600 font-semibold">Q2. (Chemistry) MOT diatomic species bond order 2.5...</p>
                <p className="text-indigo-600 font-semibold">Q3. (Maths) Definite integral int_0^(pi/2) sin^3(x)...</p>
                <p className="text-slate-400 italic text-[10px]">+ 87 more scattered questions across 30 chapters...</p>
              </div>
            </div>

            {/* Segregated Output Side */}
            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                PaYiQ Clean Chapter & Topic Buckets
              </span>
              <div className="space-y-1.5">
                <div className="p-2.5 rounded-xl bg-white border border-indigo-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Rotational Dynamics</span>
                    <span className="text-[10px] text-indigo-600 font-medium">Topic: Moment of Inertia</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    <LatexRenderer text="$\tau = I \alpha$" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-indigo-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Chemical Bonding (MOT)</span>
                    <span className="text-[10px] text-indigo-600 font-medium">Topic: Bond Order & Magnetism</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    <LatexRenderer text="$\text{N}_2^+$" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ====================================================================
          PROBLEM VS SOLUTION
          ==================================================================== */}
      <section className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">The Problem Space</span>
            <h2 className="text-3xl font-black text-slate-900">Why Students & Faculties Struggle</h2>
            <p className="text-sm text-slate-600">
              Exam conducting bodies publish question papers by shift date, not by subject chapters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-light rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Mismatched Study Habits</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students prepare chapter-by-chapter (e.g. <em>Electrostatics</em>) but shift papers scatter questions across 30+ chapters randomly.
              </p>
            </div>

            <div className="card-light rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">100+ Hours of DTP Work</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coaching faculties and operators manually copy-paste, crop, and type math formulas into Word documents to create practice sheets.
              </p>
            </div>

            <div className="card-light rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Broken Math & Poor Layouts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traditional OCR destroys fractions, integrals, and matrices. PaYiQ normalizes everything into crisp standard LaTeX.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          HOW IT WORKS (3-STEP PIPELINE)
          ==================================================================== */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Simple 3-Step Flow</span>
          <h2 className="text-3xl font-black text-slate-900">How PaYiQ Works</h2>
          <p className="text-sm text-slate-600">
            From raw exam paper to organized chapter-wise question bank in under 10 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="card-light rounded-3xl p-6 space-y-4 border-t-4 border-t-indigo-600">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Step 1: Upload Shift Paper</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload raw PDF, page screenshots, or paste OCR text. Select your target exam (JEE, NEET, CET) and choose Chapter or Topic depth.
            </p>
          </div>

          <div className="card-light rounded-3xl p-6 space-y-4 border-t-4 border-t-purple-600">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Step 2: AI Segregation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini Flash parses questions, converts math into standard KaTeX ($...$), and maps them strictly to NCERT syllabus chapters.
            </p>
          </div>

          <div className="card-light rounded-3xl p-6 space-y-4 border-t-4 border-t-emerald-600">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Step 3: Export Clean PDF</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download clean A4 PDFs with your choice of 3 modes: With Solutions, Without Answers (for test practice), or Detachable Answer Key Grid.
            </p>
          </div>

        </div>

      </section>

      {/* ====================================================================
          SYLLABUS & EXAM COVERAGE
          ==================================================================== */}
      <section id="syllabus" className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Master Syllabus Tree</span>
            <h2 className="text-3xl font-black text-slate-900">Standardized NCERT Hierarchy</h2>
            <p className="text-sm text-slate-600">
              No AI classification drift. Every question maps strictly to standard syllabus chapters.
            </p>
          </div>

          {/* Subject Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'physics', label: 'Physics', icon: Atom },
              { id: 'chemistry', label: 'Chemistry', icon: FlaskConical },
              { id: 'mathematics', label: 'Mathematics', icon: Pi },
              { id: 'biology', label: 'Biology', icon: Dna },
            ].map((sub) => {
              const Icon = sub.icon;
              const isSelected = activeSubjectTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubjectTab(sub.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>

          {/* Chapter Chips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {subjectChapters.map((chap) => (
              <div key={chap.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-indigo-600">Class {chap.classLevel}th • {chap.unit}</span>
                <h4 className="text-xs font-bold text-slate-900">{chap.name}</h4>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================================
          PRICING & CTA SECTION
          ==================================================================== */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Transparent Access</span>
          <h2 className="text-3xl font-black text-slate-900">Simple Plans for Students & Faculties</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Free Tier */}
          <div className="card-light rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Student Tier</span>
              <div className="text-3xl font-black text-slate-900">₹0 <span className="text-xs font-normal text-slate-500">/ forever</span></div>
              <p className="text-xs text-slate-600">Ideal for self-studying aspirants preparing for JEE, NEET, or CET.</p>
              
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Chapter-Wise Segregations</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> KaTeX LaTeX Math & Chemistry Formula Display</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Download Clean A4 PDF Worksheets</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 3 Answer Modes (Solutions, Hidden, End Grid)</li>
              </ul>
            </div>

            <button
              onClick={onLaunchApp}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Start Free Now
            </button>
          </div>

          {/* Pro Coaching Tier */}
          <div className="card-light rounded-3xl p-8 space-y-6 border-2 border-indigo-600 shadow-xl relative flex flex-col justify-between">
            <span className="absolute -top-3 right-6 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-600 text-white shadow-sm">
              Faculty Choice
            </span>
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Coaching Institute & Faculty</span>
              <div className="text-3xl font-black text-slate-900">₹999 <span className="text-xs font-normal text-slate-500">/ month</span></div>
              <p className="text-xs text-slate-600">For coaching teachers & DTP operators creating batch DPP sheets.</p>
              
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Custom Coaching Header & Watermark Branding</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Batch PDF Export & Detachable Answer Keys</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Cloud Database Sync & Repository Backup</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Priority Gemini Flash Extraction Queue</li>
              </ul>
            </div>

            <button
              onClick={onOpenAuth}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition"
            >
              Upgrade to Pro Faculty
            </button>
          </div>

        </div>

      </section>

      {/* ====================================================================
          FAQ SECTION
          ==================================================================== */}
      <section className="py-16 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Got Questions?</span>
          <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card-light rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* ====================================================================
          FOOTER
          ==================================================================== */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xl font-black text-white">PaYi<span className="text-indigo-400">Q</span></div>
            <p className="text-xs text-slate-400">AI-Powered Previous Year Question Segregator & Search Platform.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <button onClick={onLaunchApp} className="hover:text-white">Segregator Engine</button>
            <a href="#how-it-works" className="hover:text-white">How It Works</a>
            <a href="#syllabus" className="hover:text-white">NCERT Syllabus</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} PaYiQ. Built for JEE, NEET, and MHT-CET aspirants.
        </div>
      </footer>

    </div>
  );
}
