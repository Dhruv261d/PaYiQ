import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Settings, 
  Key, 
  CheckCircle2, 
  Database,
  FolderCheck,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  Home,
  Layers
} from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/aiExtractor';
import { isSupabaseConfigured } from '../services/supabase';

export default function Navbar({
  activeTab,
  setActiveTab,
  savedBanksCount = 0,
  currentUser = null,
  onOpenAuth,
  onLogout
}) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getGeminiApiKey());
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKeyInput);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettingsModal(false);
    }, 1200);
  };

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'segregator', label: '⚡ AI Segregator', icon: Sparkles },
    { id: 'vault', label: '📖 Master PYQ Vault', icon: BookOpen },
    { id: 'shifts', label: '📁 Shift Archive', icon: Layers },
    { id: 'library', label: '📚 Saved Banks', icon: FolderCheck, badge: savedBanksCount },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 no-print shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 p-0.5 shadow-md shadow-indigo-600/20">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-indigo-600 text-lg">
                  PQ
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    PaYi<span className="text-indigo-600">Q</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    AI Segregator
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Universal Competitive Exam PYQ Platform
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-indigo-50 text-indigo-700">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: User Profile + Settings */}
            <div className="flex items-center gap-2.5">
              
              {/* User Auth Control */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden lg:inline">{currentUser.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in duration-100">
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Settings Trigger */}
              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition"
                title="API Settings & Database"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden overflow-x-auto px-3 py-2 border-t border-slate-100 bg-slate-50 gap-1 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 text-center rounded-xl text-xs font-bold whitespace-nowrap ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-100 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black text-slate-900 text-base">Platform Configuration</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Gemini API Key */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  Google Gemini Flash API Key (@google/genai)
                </span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-indigo-600 hover:underline font-semibold"
                >
                  Get Free Key →
                </a>
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono transition"
              />
              <p className="text-[11px] text-slate-500">
                Powers the Gemini Flash document parsing, equation LaTeX normalization, and taxonomy alignment.
              </p>
            </div>

            {/* Supabase Status */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-slate-800">Supabase Cloud Database</div>
                  <div className="text-[10px] text-slate-500">
                    {isSupabaseConfigured ? 'Connected to PostgreSQL' : 'Local Storage Active (Zero-Config)'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                isSupabaseConfigured ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {isSupabaseConfigured ? 'Online' : 'Local Storage'}
              </span>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 transition"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    Saved!
                  </>
                ) : (
                  'Save Configuration'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
