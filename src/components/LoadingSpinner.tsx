import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin enhanced-shadow glow-effect"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-navy-300 rounded-full animate-spin animate-reverse"></div>
      </div>
      <p className="mt-6 text-navy-900 font-black text-2xl animate-pulse-slow text-enhanced">
        🤖 AI is analyzing your ingredients...
      </p>
      <p className="text-navy-700 mt-2 font-bold text-enhanced">
        Google Gemini is crafting your perfect recipe
      </p>
    </div>
  );
};