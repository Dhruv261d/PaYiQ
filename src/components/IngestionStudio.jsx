import React, { useState } from 'react';
import { 
  Cpu, 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Database, 
  Code, 
  Eye, 
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { parseExamDocument } from '../services/aiExtractor';
import { saveParsedQuestions } from '../services/questionService';
import LatexRenderer from './LatexRenderer';
import { CHAPTERS, EXAMS, SUBJECTS } from '../data/taxonomy';

export default function IngestionStudio({ onQuestionsAdded }) {
  const [rawText, setRawText] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Metadata hints
  const [examHint, setExamHint] = useState('JEE_MAIN');
  const [yearHint, setYearHint] = useState(2025);
  const [sessionHint, setSessionHint] = useState('2025_JAN_S1');

  // Execution state
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState([]);
  const [rawJsonResponse, setRawJsonResponse] = useState('');
  const [commitStatus, setCommitStatus] = useState(null);

  // Sample Presets for 1-click instant testing
  const samplePresets = [
    {
      label: 'Sample JEE Physics (Rotational)',
      text: `Q.23 A uniform disc of mass M = 4 kg and radius R = 0.5 m is rolling without slipping on a horizontal plane with velocity v = 6 m/s. Find the total kinetic energy of the disc.\n(A) 54 J\n(B) 72 J\n(C) 108 J\n(D) 36 J\nAns: (A)\nSol: Total K.E = (1/2) M v^2 + (1/2) I omega^2 = (1/2) M v^2 + (1/2)(1/2 M R^2)(v/R)^2 = (3/4) M v^2 = (3/4) * 4 * 36 = 54 J.`,
      exam: 'JEE_MAIN',
      year: 2024,
      session: '2024_JAN_30_S1'
    },
    {
      label: 'Sample NEET Chemistry (Equilibrium)',
      text: `Q.45 For the reaction N2(g) + 3H2(g) <=> 2NH3(g), the equilibrium constant is Kc = 64 at 500 K. What is the equilibrium constant for the reaction NH3(g) <=> (1/2) N2(g) + (3/2) H2(g) at the same temperature?\n(A) 1/8\n(B) 1/64\n(C) 8\n(D) 1/32\nAns: (A)\nSol: When a reaction is reversed and multiplied by 1/2, the new equilibrium constant K' = 1 / sqrt(Kc) = 1 / sqrt(64) = 1/8.`,
      exam: 'NEET',
      year: 2024,
      session: '2024_NEET_UG'
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPreset = (preset) => {
    setRawText(preset.text);
    setExamHint(preset.exam);
    setYearHint(preset.year);
    setSessionHint(preset.session);
    setImageBase64(null);
    setImagePreview(null);
  };

  const handleRunAiExtraction = async () => {
    if (!rawText.trim() && !imageBase64) return;

    setIsProcessing(true);
    setCommitStatus(null);
    try {
      const result = await parseExamDocument({
        rawText,
        imageBase64,
        examHint,
        yearHint,
        sessionHint,
      });

      if (result.success && result.questions) {
        setExtractedQuestions(result.questions);
        setRawJsonResponse(result.rawResponse || JSON.stringify(result.questions, null, 2));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommitToDatabase = async () => {
    if (!extractedQuestions.length) return;

    setIsProcessing(true);
    try {
      const res = await saveParsedQuestions(extractedQuestions);
      if (res.success) {
        setCommitStatus({ success: true, count: res.count });
        if (onQuestionsAdded) onQuestionsAdded();
      }
    } catch (err) {
      setCommitStatus({ success: false, error: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateQuestionTaxonomy = (idx, field, value) => {
    const updated = [...extractedQuestions];
    updated[idx] = { ...updated[idx], [field]: value };
    setExtractedQuestions(updated);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      
      {/* Studio Header */}
      <div className="glass-panel rounded-3xl p-6 shadow-xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-600/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">AI Document Ingestion & Segregation Studio</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Gemini Flash @google/genai
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Multimodal PDF/Image & Raw Text parsing into LaTeX ($...$, $$...$$) with NCERT taxonomy alignment.
            </p>
          </div>
        </div>
      </div>

      {/* Input Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Input & Settings */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
            
            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Quick Test Sample Presets:
              </span>
              <div className="flex flex-col gap-1.5">
                {samplePresets.map((pr, i) => (
                  <button
                    key={i}
                    onClick={() => handleApplyPreset(pr)}
                    className="text-left px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-indigo-300 hover:text-white transition"
                  >
                    {pr.label} →
                  </button>
                ))}
              </div>
            </div>

            {/* Target Metadata Hints */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-1">Target Exam</label>
                <select
                  value={examHint}
                  onChange={(e) => setExamHint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                >
                  {EXAMS.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-1">Year</label>
                <input
                  type="number"
                  value={yearHint}
                  onChange={(e) => setYearHint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 block mb-1">Shift / Session</label>
                <input
                  type="text"
                  value={sessionHint}
                  onChange={(e) => setSessionHint(e.target.value)}
                  placeholder="2025_JAN_S1"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Raw Text Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                Raw Question / Paper Text
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste shift question text or OCR dump here..."
                rows={7}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Image / Scanned PDF Page Upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                Or Scanned Shift Page Image / Screenshot
              </label>
              <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-950/50 transition relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Uploaded preview" className="max-h-32 mx-auto rounded-lg" />
                    <span className="text-[10px] text-emerald-400 font-semibold block">Image Loaded Ready for Vision OCR</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <UploadCloud className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs font-semibold text-slate-400">Click or drop exam page screenshot</p>
                    <p className="text-[10px] text-slate-500">PNG, JPG, WEBP (Supports diagrams & circuits)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Run Parse Button */}
            <button
              onClick={handleRunAiExtraction}
              disabled={isProcessing || (!rawText.trim() && !imageBase64)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Parsing with Gemini Flash...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Execute Multimodal Extraction
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right 7 Cols: Live LaTeX Extraction Preview & Taxonomy Matcher */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl min-h-[480px]">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Extraction & Taxonomy Verification</h3>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-400">
                {extractedQuestions.length} Questions Detected
              </span>
            </div>

            {/* Empty State */}
            {extractedQuestions.length === 0 ? (
              <div className="h-80 flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-500">
                <Layers className="w-12 h-12 text-slate-700" />
                <p className="text-xs font-semibold">No extraction executed yet.</p>
                <p className="text-[11px] text-slate-600 max-w-sm">
                  Choose a sample preset or paste raw question text on the left, then click <strong>Execute Multimodal Extraction</strong>.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                {extractedQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    
                    {/* Taxonomy Alignment Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <label className="text-[9px] font-bold uppercase text-slate-400 block mb-0.5">Subject</label>
                        <select
                          value={q.subject_id}
                          onChange={(e) => updateQuestionTaxonomy(idx, 'subject_id', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-1"
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold uppercase text-slate-400 block mb-0.5">NCERT Chapter</label>
                        <select
                          value={q.chapter_id}
                          onChange={(e) => updateQuestionTaxonomy(idx, 'chapter_id', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-1"
                        >
                          {CHAPTERS.filter(c => c.subjectId === q.subject_id).map((c) => (
                            <option key={c.id} value={c.id}>[{c.classLevel}th] {c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold uppercase text-slate-400 block mb-0.5">Difficulty</label>
                        <select
                          value={q.difficulty}
                          onChange={(e) => updateQuestionTaxonomy(idx, 'difficulty', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-1"
                        >
                          <option value="EASY">EASY</option>
                          <option value="MEDIUM">MEDIUM</option>
                          <option value="HARD">HARD</option>
                        </select>
                      </div>
                    </div>

                    {/* Normalized LaTeX Statement */}
                    <div className="text-xs md:text-sm text-slate-200 leading-relaxed border-l-2 border-indigo-500 pl-3 py-1">
                      <LatexRenderer text={q.question_text} />
                    </div>

                    {/* Options Preview */}
                    {q.options && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt) => (
                          <div key={opt.id} className="p-2 rounded bg-slate-900 border border-slate-800 flex items-start gap-1.5">
                            <span className="font-bold text-indigo-400">({opt.id})</span>
                            <div>
                              <LatexRenderer text={opt.text} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Correct Answer & Solution Preview */}
                    <div className="bg-slate-900 p-2.5 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-emerald-400">Correct Answer: {q.correct_answer}</span>
                      <div className="text-slate-300">
                        <LatexRenderer text={q.solution_text} />
                      </div>
                    </div>

                  </div>
                ))}

                {/* Commit Action */}
                <div className="pt-2">
                  <button
                    onClick={handleCommitToDatabase}
                    disabled={isProcessing}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
                  >
                    <Database className="w-4 h-4" />
                    Commit {extractedQuestions.length} Questions to Master Repository (Supabase)
                  </button>
                </div>

                {commitStatus && (
                  <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    commitStatus.success ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                  }`}>
                    {commitStatus.success ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Successfully committed {commitStatus.count} questions to the database repository!
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        Error committing questions: {commitStatus.error}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
