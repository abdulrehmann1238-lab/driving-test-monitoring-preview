import React from 'react';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  options: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center border-b border-[#E5EAE5] gap-1 sm:gap-2 overflow-x-auto ${className}`}>
      {options.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              isActive
                ? 'border-[#557A65] text-[#304F40]'
                : 'border-transparent text-[#77817A] hover:text-[#202923] hover:border-[#D0D8D1]'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive ? 'bg-[#557A65]/15 text-[#304F40]' : 'bg-[#EFF2EF] text-[#77817A]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
