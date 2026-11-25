import React, { useEffect, useState, useCallback } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  brandName?: string;
}

const STAGES = [
  { progress: 24, text: 'Initialising workspace' },
  { progress: 56, text: 'Preparing monitoring environment' },
  { progress: 82, text: 'Loading operations' },
  { progress: 100, text: 'Workspace ready' },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, brandName = 'AutoPass OS' }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(24);
  const [fadeOut, setFadeOut] = useState(false);

  const handleInstantComplete = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 80);
  }, [onComplete]);

  useEffect(() => {
    // Fast, responsive loading animation (~450ms total)
    const timers = [
      setTimeout(() => { setCurrentStageIdx(1); setProgress(56); }, 90),
      setTimeout(() => { setCurrentStageIdx(2); setProgress(82); }, 220),
      setTimeout(() => { setCurrentStageIdx(3); setProgress(100); }, 360),
      setTimeout(() => { setFadeOut(true); }, 460),
      setTimeout(() => { onComplete(); }, 540),
    ];

    const handleKeyDown = () => handleInstantComplete();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, handleInstantComplete]);

  return (
    <div
      onClick={handleInstantComplete}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F6F7F5] cursor-pointer transition-opacity duration-150 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      title="Click anywhere to skip loading"
    >
      <div className="flex flex-col items-center max-w-sm w-full px-6">
        {/* Minimal brand symbol */}
        <div className="relative mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#304F40] shadow-elevated flex items-center justify-center text-white transition-transform duration-300 hover:scale-105">
            <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
              <path d="M14 32L24 12L34 32" stroke="#EFF2EF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 25H30" stroke="#A7BBA9" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="24" cy="22" r="3" fill="#D9A85C"/>
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#557A65] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#557A65]"></span>
          </span>
        </div>

        {/* Product Name */}
        <h1 className="text-lg font-heading font-semibold text-[#202923] tracking-tight mb-1">
          {brandName}
        </h1>
        <p className="text-[11px] text-[#77817A] uppercase tracking-wider mb-6 font-medium">
          Driving Test Monitoring & Automation
        </p>

        {/* Thin fast progress indicator */}
        <div className="w-full bg-[#E5EAE5] h-[3px] rounded-full overflow-hidden mb-2.5">
          <div
            className="h-full bg-[#557A65] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic status label beneath */}
        <div className="flex items-center justify-between w-full text-[11px] text-[#77817A] tabular-nums">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#557A65] animate-pulse"></span>
            {STAGES[currentStageIdx].text}
          </span>
          <span className="font-semibold text-[#202923]">{progress}%</span>
        </div>

        {/* Quick skip button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleInstantComplete();
          }}
          className="mt-6 text-[10px] text-[#77817A] hover:text-[#202923] bg-white border border-[#E5EAE5] hover:border-[#D0D8D1] px-2.5 py-1 rounded-full transition-all"
        >
          Skip loader →
        </button>
      </div>
    </div>
  );
};
