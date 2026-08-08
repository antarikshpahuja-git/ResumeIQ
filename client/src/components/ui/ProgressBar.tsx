import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  sublabel?: string;
  showValue?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  sublabel,
  showValue = true
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = (val: number) => {
    if (val < 50) return 'bg-rose-500';
    if (val < 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-end mb-1">
          <div className="flex flex-col">
            {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
            {sublabel && <span className="text-xs text-slate-500 dark:text-slate-400">{sublabel}</span>}
          </div>
          {showValue && <span className="text-sm font-bold text-slate-900 dark:text-white">{value}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getColor(value)}`}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
    </div>
  );
};
