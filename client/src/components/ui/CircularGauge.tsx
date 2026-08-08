import React, { useEffect, useState } from 'react';

interface CircularGaugeProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  label,
  size = 'md'
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);
    
    const animate = () => {
      start += increment;
      if (start < value) {
        setAnimatedValue(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(value);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value]);

  const sizes = {
    sm: { radius: 24, stroke: 4, text: 'text-lg', label: 'text-xs' },
    md: { radius: 36, stroke: 6, text: 'text-2xl', label: 'text-sm' },
    lg: { radius: 48, stroke: 8, text: 'text-4xl', label: 'text-base' },
    xl: { radius: 72, stroke: 12, text: 'text-6xl', label: 'text-xl' }
  };

  const { radius, stroke, text, label: labelSize } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  const getColor = (val: number) => {
    if (val < 50) return '#f43f5f'; // rose-500
    if (val < 75) return '#f59e0b'; // amber-500
    return '#10b981'; // emerald-500
  };

  const color = getColor(value);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg
        width={(radius + stroke) * 2}
        height={(radius + stroke) * 2}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`font-bold ${text} text-slate-900 dark:text-white`}>
          {animatedValue}
        </span>
      </div>
      {label && (
        <span className={`mt-2 font-medium text-slate-600 dark:text-slate-400 ${labelSize}`}>
          {label}
        </span>
      )}
    </div>
  );
};
