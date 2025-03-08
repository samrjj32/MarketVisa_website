import React from 'react';

const MarqueeBanner = () => {
  return (
    <div className="bg-[#00D066] text-white overflow-hidden py-2 flex items-center justify-center">
      {/* Add responsive design to handle text wrapping for mobile */}
      <div className="flex items-center">
        <span className="inline-block mx-4 text-base sm:text-sm md:text-base whitespace-normal sm:whitespace-nowrap">
          2-3 hours mutual fund masterclass, we cover everything related to mutual fund investing.
        </span>
      </div>
    </div>
  );
};

export default MarqueeBanner;
