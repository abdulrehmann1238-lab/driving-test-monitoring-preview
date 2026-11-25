import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  brandName?: string;
}

const STAGES = [
  { progress: 18, text: 'Initialising workspace' },
  { progress: 42, text: 'Preparing monitoring environment' },
  { progress: 68, text: 'Loading customer operations' },
  { progress: 89, text: 'Synchronising dashboard data' },
  { progress: 100, text: 'Workspace ready' },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, brandName = 'AutoPass OS' }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(12);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => { setCurrentStageIdx(1); setProgress(42); }, 380),
      setTimeout(() => { setCurrentStageIdx(2); setProgress(68); }, 820),
      setTimeout(() => { setCurrentStageIdx(3); setProgress(89); }, 1300),
      setTimeout(() => { setCurrentStageIdx(4); setProgress(100); }, 1750),
      setTimeout(() => { setFadeOut(true); }, 2050),
      setTimeout(() => { onComplete(); }, 2400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F6F7F5] transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm w-full px-6">
        {/* Minimal brand symbol with subtle pulse */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#304F40] shadow-elevated flex items-center justify-center text-white transition-transform duration-500 hover:scale-105">
            <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
              <path d="M14 32L24 12L34 32" stroke="#EFF2EF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 25H30" stroke="#A7BBA9" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="24" cy="22" r="3" fill="#D9A85C"/>
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#557A65] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#557A65]"></span>
          </span>
        </div>

        {/* Product Name & Brand Tagline */}
        <h1 className="text-xl font-heading font-semibold text-[#202923] tracking-tight mb-1">
          {brandName}
        </h1>
        <p className="text-xs text-[#77817A] uppercase tracking-wider mb-8 font-medium">
          Driving Test Monitoring & Automation
        </p>

        {/* Thin animated progress indicator */}
        <div className="w-full bg-[#E5EAE5] h-[3px] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-[#557A65] rounded-full transition-all duration-300 ease-out"
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
      </div>
    </div>
  );
};
