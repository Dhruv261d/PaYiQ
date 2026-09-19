import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SegregatorStudio from './components/SegregatorStudio';
import SegregatedResults from './components/SegregatedResults';
import MasterVault from './components/MasterVault';
import ShiftArchive from './components/ShiftArchive';
import LibraryWorkspace from './components/LibraryWorkspace';
import AuthModal from './components/AuthModal';
import { generateMockSegregatedResponse } from './services/aiExtractor';
import { getCurrentUser, logoutUser } from './services/authService';

const SAVED_BANKS_KEY = 'PAYIQ_SAVED_BANKS';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing', 'segregator', 'vault', 'shifts', 'library'
  const [currentSegregatedData, setCurrentSegregatedData] = useState(null);
  const [savedBanks, setSavedBanks] = useState([]);
  
  // Auth state & Protected Routes
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [authCustomNotice, setAuthCustomNotice] = useState(null);
  const [pendingTabAfterAuth, setPendingTabAfterAuth] = useState(null);

  // Load saved banks
  useEffect(() => {
    const data = localStorage.getItem(SAVED_BANKS_KEY);
    if (data) {
      try {
        setSavedBanks(JSON.parse(data));
      } catch (e) {
        setSavedBanks([]);
      }
    } else {
      setSavedBanks([]);
      localStorage.setItem(SAVED_BANKS_KEY, JSON.stringify([]));
    }
  }, []);

  // Auth Guard helper: Protected tabs require authentication
  const handleTabChange = (tabId) => {
    if (tabId !== 'landing' && !currentUser) {
      setAuthCustomNotice('Please sign in to access the AI Segregator, Master Vault, and Shift Archive.');
      setPendingTabAfterAuth(tabId);
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tabId);
  };

  const handleSegregationComplete = (result) => {
    setCurrentSegregatedData(result);
  };

  const handleResetSegregator = () => {
    setCurrentSegregatedData(null);
  };

  const handleSaveToLibrary = (dataToSave) => {
    const newBank = {
      id: `bank-${Date.now()}`,
      ...dataToSave,
      savedAt: new Date().toISOString(),
    };
    const updated = [newBank, ...savedBanks];
    setSavedBanks(updated);
    localStorage.setItem(SAVED_BANKS_KEY, JSON.stringify(updated));
  };

  const handleDeleteBank = (bankId) => {
    const updated = savedBanks.filter((b) => b.id !== bankId);
    setSavedBanks(updated);
    localStorage.setItem(SAVED_BANKS_KEY, JSON.stringify(updated));
    if (currentSegregatedData && currentSegregatedData.id === bankId) {
      setCurrentSegregatedData(null);
    }
  };

  const handleOpenBankFromLibrary = (bank) => {
    setCurrentSegregatedData(bank);
    setActiveTab('segregator');
  };

  const handleSelectShiftForSegregation = (shift) => {
    // If not logged in, prompt auth
    if (!currentUser) {
      setAuthCustomNotice('Please sign in to segregate shift papers with AI.');
      setPendingTabAfterAuth('segregator');
      setShowAuthModal(true);
      return;
    }
    // Set mock or real segregation
    const result = generateMockSegregatedResponse({
      exam: shift.exam,
      year: shift.year,
      paperTitle: `${shift.title} - Chapter-Wise Segregated`,
      granularity: 'chapter_topic',
      rawText: shift.sampleText
    });
    setCurrentSegregatedData(result);
    setActiveTab('segregator');
  };

  const isCurrentDataAlreadySaved = Boolean(
    currentSegregatedData && 
    (currentSegregatedData.id && savedBanks.some(b => b.id === currentSegregatedData.id))
  );

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    if (pendingTabAfterAuth) {
      setActiveTab(pendingTabAfterAuth);
      setPendingTabAfterAuth(null);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setActiveTab('landing');
  };

  const handleOpenAuth = (initialMode = 'login', notice = null) => {
    setAuthInitialMode(initialMode);
    setAuthCustomNotice(notice);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedBanksCount={savedBanks.length}
        currentUser={currentUser}
        onOpenAuth={() => handleOpenAuth('login')}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: LANDING PAGE */}
        {activeTab === 'landing' && (
          <LandingPage
            onLaunchApp={() => handleTabChange('segregator')}
            onOpenAuth={() => handleOpenAuth('register')}
          />
        )}

        {/* VIEW 2: AI SEGREGATOR STUDIO & ACTIVE RESULTS */}
        {activeTab === 'segregator' && (
          <div>
            {!currentSegregatedData ? (
              <div className="space-y-6">
                <div className="text-center space-y-2 max-w-2xl mx-auto pt-2 pb-4 no-print">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    AI Examination Segregation Engine
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Turn Monolithic Shift Papers into <br />
                    <span className="gradient-text">
                      Chapter & Topic-Wise Question Banks
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Upload mixed shift PDFs or images $\to$ Gemini Flash normalizes formulas to LaTeX and organizes questions strictly by NCERT syllabus.
                  </p>
                </div>

                <SegregatorStudio
                  onSegregationComplete={handleSegregationComplete}
                />
              </div>
            ) : (
              <SegregatedResults
                segregatedData={currentSegregatedData}
                onReset={handleResetSegregator}
                onSaveToLibrary={handleSaveToLibrary}
                isAlreadySaved={isCurrentDataAlreadySaved}
              />
            )}
          </div>
        )}

        {/* VIEW 3: MASTER PYQ CHAPTER VAULT */}
        {activeTab === 'vault' && (
          <MasterVault
            currentUser={currentUser}
            onRequireAuth={(msg) => handleOpenAuth('login', msg)}
          />
        )}

        {/* VIEW 4: SHIFT-WISE PAPERS ARCHIVE */}
        {activeTab === 'shifts' && (
          <ShiftArchive
            onSelectShiftForSegregation={handleSelectShiftForSegregation}
          />
        )}

        {/* VIEW 5: SAVED QUESTION BANKS LIBRARY */}
        {activeTab === 'library' && (
          <LibraryWorkspace
            savedBanks={savedBanks}
            onOpenBank={handleOpenBankFromLibrary}
            onDeleteBank={handleDeleteBank}
            onNavigateToSegregator={() => {
              setCurrentSegregatedData(null);
              setActiveTab('segregator');
            }}
          />
        )}

      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authInitialMode}
        customNotice={authCustomNotice}
      />

    </div>
  );
}
