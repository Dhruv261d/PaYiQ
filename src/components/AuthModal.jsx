import React, { useState } from 'react';
import { 
  LogIn, 
  UserPlus, 
  KeyRound, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  X,
  ShieldCheck
} from 'lucide-react';
import { loginUser, registerUser, resetPassword } from '../services/authService';
import { EXAMS } from '../data/taxonomy';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onAuthSuccess, 
  initialMode = 'login',
  customNotice = null 
}) {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetExam, setTargetExam] = useState('JEE_MAIN');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        if (!email || !password) {
          setErrorMsg('Please enter both email and password.');
          setIsLoading(false);
          return;
        }
        const res = await loginUser({ email, password });
        if (res.success) {
          onAuthSuccess(res.user);
          onClose();
        }
      } else if (mode === 'register') {
        if (!name || !email || !password) {
          setErrorMsg('Please fill in all required fields.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }
        const res = await registerUser({ name, email, password, targetExam });
        if (res.success) {
          onAuthSuccess(res.user);
          onClose();
        }
      } else if (mode === 'forgot') {
        if (!email) {
          setErrorMsg('Please enter your registered email address.');
          setIsLoading(false);
          return;
        }
        const res = await resetPassword(email);
        setSuccessMsg(res.message || `Password reset instructions sent to ${email}.`);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Custom Notice if user was blocked by Auth Wall */}
        {customNotice && (
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs font-semibold text-indigo-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>{customNotice}</span>
          </div>
        )}

        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-indigo-600/20 mb-3">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-indigo-600 text-xl">
              PQ
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {mode === 'login' && 'Sign In to PaYiQ Workspace'}
            {mode === 'register' && 'Create Your Student Account'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="text-xs text-slate-500">
            {mode === 'login' && 'Access the AI Segregator, Master Vault, and Download PDFs'}
            {mode === 'register' && 'Join thousands of aspirants organizing past papers'}
            {mode === 'forgot' && 'Enter your email to receive a password recovery link'}
          </p>
        </div>

        {/* Tab Switcher */}
        {mode !== 'forgot' && (
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                mode === 'login'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                mode === 'register'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error / Success Alerts */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Register: Name & Target Exam */}
          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Target Examination</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                  >
                    {EXAMS.map((ex) => (
                      <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address (Must be unique)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Password */}
          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In to Workspace'}
                  {mode === 'register' && 'Create Free Account'}
                  {mode === 'forgot' && 'Dispatch Password Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Switcher */}
        {mode === 'forgot' && (
          <div className="text-center pt-2">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              ← Back to Sign In
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
