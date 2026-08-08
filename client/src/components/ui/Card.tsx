import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradientBorder?: boolean;
  hoverLift?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  gradientBorder = false,
  hoverLift = true,
  padding = 'md'
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseContent = (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl w-full h-full ${paddings[padding]}`}>
      {children}
    </div>
  );

  return (
    <div className={`
      relative rounded-2xl
      ${hoverLift ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl' : ''}
      ${gradientBorder ? 'p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500' : 'shadow-sm border border-slate-200 dark:border-slate-700'}
      ${className}
    `}>
      {baseContent}
    </div>
  );
};
