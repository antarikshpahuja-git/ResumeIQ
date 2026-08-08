import React, { useState } from 'react';

export interface TabItem {
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: number;
  activeTab?: number;
  onChange?: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab = 0,
  activeTab,
  onChange
}) => {
  const [internalTab, setInternalTab] = useState(defaultTab);
  const currentTab = activeTab !== undefined ? activeTab : internalTab;

  const handleTabClick = (index: number) => {
    if (activeTab === undefined) {
      setInternalTab(index);
    }
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-700 no-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`
              flex items-center whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors relative
              ${currentTab === index 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'}
            `}
            onClick={() => handleTabClick(index)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {currentTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
      <div className="py-6">
        {tabs[currentTab]?.content}
      </div>
    </div>
  );
};
