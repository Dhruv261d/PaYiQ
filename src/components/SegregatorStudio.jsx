import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Layers, 
  Play, 
  CheckCircle2, 
  GraduationCap, 
  FileCheck,
  Zap,
  Eye,
  EyeOff,
  Grid
} from 'lucide-react';
import { segregateExamPaper } from '../services/aiExtractor';
import { EXAMS } from '../data/taxonomy';

export default function SegregatorStudio({ onSegregationComplete }) {
  // Config state
  const [selectedExam, setSelectedExam] = useState('JEE_MAIN');
  const [year, setYear] = useState(2024);
  const [paperTitle, setPaperTitle] = useState('JEE Main 2024 Jan 29 Shift 1');
  const [granularity, setGranularity] = useState('chapter_topic'); // 'chapter' or 'chapter_topic'

  // Input states
  const [rawText, setRawText] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');

  // Real shift presets for 1-click test drive
  const shiftPresets = [
    {
      label: 'JEE Main 2024 Mixed Shift Paper (Physics, Chem, Math)',
      exam: 'JEE_MAIN',
      year: 2024,
      title: 'JEE Main 2024 (Jan 29 Shift 1) - Mixed Paper',
      text: `[QUESTION 1 - PHYSICS]
A solid cylinder of mass M = 2 kg and radius R = 0.2 m is free to rotate about its horizontal axis. A string is wound around the cylinder and a constant force F = 10 N is applied. Find the angular acceleration alpha.
(A) 25 rad/s^2  (B) 50 rad/s^2  (C) 100 rad/s^2  (D) 10 rad/s^2
Ans: B. Sol: tau = F*R = 2. I = 1/2 M R^2 = 0.04. alpha = tau/I = 50 rad/s^2.

[QUESTION 2 - CHEMISTRY]
According to Molecular Orbital Theory (MOT), which diatomic species is paramagnetic with a bond order of 2.5?
(A) O2^2-  (B) N2^+  (C) C2^2-  (D) O2^2+
Ans: B. Sol: N2^+ has 13 electrons with bond order = (9-4)/2 = 2.5 and 1 unpaired electron.

[QUESTION 3 - MATHEMATICS]
The value of the definite integral I = int_0^(pi/2) [sin^3(x) / (sin^3(x) + cos^3(x))] dx is:
(A) pi/2  (B) pi/4  (C) pi/8  (D) 0
Ans: B. Sol: By King's Property 2I = int_0^(pi/2) 1 dx = pi/2 => I = pi/4.

[QUESTION 4 - PHYSICS]
The ratio of rotational kinetic energy to total kinetic energy for a thin uniform circular ring rolling on a flat surface without slipping is:
(A) 1 : 2  (B) 1 : 3  (C) 2 : 3  (D) 1 : 1
Ans: A. Sol: K_rot = 1/2 M v^2, K_total = M v^2. Ratio = 1/2.

[QUESTION 5 - PHYSICS]
Two point charges +4q and +q are placed at distance L = 30 cm. A third charge Q is placed between them in equilibrium. Find distance x from +4q.
Ans: 20. Sol: 4/x^2 = 1/(L-x)^2 => 2/x = 1/(L-x) => 3x = 2L => x = 20 cm.`
    },
    {
      label: 'NEET 2024 Mixed Shift Paper (Biology & Chemistry)',
      exam: 'NEET',
      year: 2024,
      title: 'NEET UG 2024 - Mixed Shift Paper',
      text: `[QUESTION 1 - BIOLOGY]
In a dihybrid test cross between a heterozygous tall round-seeded pea plant (TtRr) and a homozygous dwarf wrinkled plant (ttrr), the phenotypic ratio is:
(A) 9:3:3:1  (B) 1:1:1:1  (C) 3:1  (D) 1:2:1
Ans: B. Sol: Classic Mendelian dihybrid test cross yields 1:1:1:1.

[QUESTION 2 - CHEMISTRY]
Which of the following compounds undergoes self-Cannizzaro reaction when treated with concentrated NaOH?
(A) CH3CHO  (B) CH3COCH3  (C) C6H5CHO (Benzaldehyde)  (D) CH3CH2CHO
Ans: C. Sol: Benzaldehyde lacks alpha-hydrogens, undergoing disproportionation into Benzoate and Benzyl Alcohol.`
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    if (file.type.startsWith('image/')) {
      reader.onload = () => {
        setImageBase64(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // PDF / Text file
      reader.onload = () => {
        setRawText(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const handleApplyPreset = (pr) => {
    setSelectedExam(pr.exam);
    setYear(pr.year);
    setPaperTitle(pr.title);
    setRawText(pr.text);
    setImageBase64(null);
    setImagePreview(null);
    setFileName('');
  };

  const handleExecuteSegregation = async () => {
    if (!rawText.trim() && !imageBase64) return;

    setIsProcessing(true);
    setProcessingStage('Ingesting monolithic exam paper...');

    try {
      setTimeout(() => setProcessingStage('Parsing mathematical equations into KaTeX LaTeX standard...'), 600);
      setTimeout(() => setProcessingStage('Aligning questions against Master NCERT Chapter & Topic taxonomy...'), 1200);

      const result = await segregateExamPaper({
        rawText,
        imageBase64,
        exam: selectedExam,
        year,
        paperTitle,
        granularity,
      });

      if (result.success && result.questions) {
        onSegregationComplete(result);
      }
    } catch (err) {
      console.error('Segregation failed:', err);
    } finally {
      setIsProcessing(false);
      setProcessingStage('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Step 1: Exam & Granularity Setup Card */}
      <div className="card-light rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-slate-200">
        
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Step 1: Select Target Exam & Segregation Depth</h2>
            <p className="text-xs text-slate-500">
              Configure target syllabus alignment and choose whether to group questions by chapter or granular topics.
            </p>
          </div>
        </div>

        {/* Exam Selection Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Target Examination</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EXAMS.map((ex) => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExam(ex.id);
                  setPaperTitle(`${ex.name} ${year} Shift Paper`);
                }}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                  selectedExam === ex.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{ex.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Paper Title & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-700">Paper / Shift Title</label>
            <input
              type="text"
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              placeholder="e.g. JEE Main 2024 Jan 29 Shift 1"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Exam Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Segregation Granularity Choice */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Choose Segregation Granularity
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setGranularity('chapter_topic')}
              className={`p-4 rounded-2xl text-left border transition ${
                granularity === 'chapter_topic'
                  ? 'bg-indigo-50/70 border-indigo-300 text-slate-900 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-indigo-700">Chapter + Micro-Topic Wise (Recommended)</span>
                {granularity === 'chapter_topic' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-[11px] text-slate-500">
                Groups questions by NCERT Chapter and sub-clusters them into specific concepts (e.g. *Moment of Inertia*, *Rolling Motion*).
              </p>
            </button>

            <button
              onClick={() => setGranularity('chapter')}
              className={`p-4 rounded-2xl text-left border transition ${
                granularity === 'chapter'
                  ? 'bg-indigo-50/70 border-indigo-300 text-slate-900 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-indigo-700">Chapter Wise Only</span>
                {granularity === 'chapter' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-[11px] text-slate-500">
                Clusters questions strictly by NCERT Chapter titles without sub-topic dividing.
              </p>
            </button>
          </div>
        </div>

      </div>

      {/* Step 2: Upload Mixed Question Paper Card */}
      <div className="card-light rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-slate-200">
        
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Step 2: Upload Mixed Question Paper</h2>
            <p className="text-xs text-slate-500">
              Upload monolithic exam PDF, shift screenshots, paste OCR text, or choose a 1-click sample shift.
            </p>
          </div>
        </div>

        {/* 1-Click Sample Shift Papers */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            1-Click Sample Shift Papers (Instant Test Drive):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shiftPresets.map((pr, i) => (
              <button
                key={i}
                onClick={() => handleApplyPreset(pr)}
                className="text-left px-4 py-3 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-900 transition flex items-center justify-between"
              >
                <span>{pr.label}</span>
                <span className="text-xs text-indigo-600 font-semibold">Load →</span>
              </button>
            ))}
          </div>
        </div>

        {/* File Dropzone */}
        <div className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-3xl p-6 text-center cursor-pointer bg-slate-50/70 hover:bg-slate-50 transition relative">
          <input
            type="file"
            accept=".pdf,image/*,.txt"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {imagePreview ? (
            <div className="space-y-2">
              <img src={imagePreview} alt="Uploaded shift page" className="max-h-36 mx-auto rounded-xl shadow-md" />
              <span className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1">
                <FileCheck className="w-4 h-4 text-emerald-600" /> Shift Image Loaded Ready for Vision OCR
              </span>
            </div>
          ) : fileName ? (
            <div className="space-y-1">
              <FileText className="w-8 h-8 text-indigo-600 mx-auto" />
              <p className="text-xs font-bold text-slate-900">{fileName}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Document ready for AI parsing</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Click or Drag & Drop Raw Shift PDF / Images</p>
              <p className="text-[11px] text-slate-400">Supports PDF, PNG, JPG, and Text dumps</p>
            </div>
          )}
        </div>

        {/* Text Input Option */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Or Paste Raw Shift Paper Questions / Text
          </label>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste mixed questions from question paper here..."
            rows={6}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white transition"
          />
        </div>

        {/* Action Button & Processing Indicator */}
        <div className="pt-2 space-y-3">
          <button
            onClick={handleExecuteSegregation}
            disabled={isProcessing || (!rawText.trim() && !imageBase64)}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-40 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 transition transform active:scale-[0.99]"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Segregating Questions with Gemini Flash...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Segregate Questions Into Chapters & Topics Now</span>
              </>
            )}
          </button>

          {isProcessing && (
            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 text-center animate-pulse">
              <span className="text-xs font-bold text-indigo-700">{processingStage}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
