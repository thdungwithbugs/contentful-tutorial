import React from "react";

const AnimateCircle = () => {
  return (
    <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]">
      <div className="w-[140px] sm:w-[200px] md:w-[300px] aspect-square rounded-full bg-black/5 group absolute animate-[orbit_infinite_linear_12s]">
        <div className="absolute bg-gradient-to-br from-sky-500 to-sky-100 w-3 md:w-6 rounded-full aspect-square animate-[anti-orbit1_infinite_linear_12s]"></div>
      </div>
      <div className="w-[170px] sm:w-[230px] md:w-[400px] aspect-square rounded-full bg-black/5 absolute animate-[orbit_infinite_linear_16s]">
        <div className="absolute bg-gradient-to-br from-sky-500 to-sky-100 w-3 md:w-6 rounded-full aspect-square animate-[anti-orbit2_infinite_linear_16s]"></div>
      </div>
      <div className="w-[200px] sm:w-[260px] md:w-[500px] aspect-square rounded-full bg-black/5 absolute animate-[orbit_infinite_linear_20s]">
        <div className="absolute bg-gradient-to-br from-sky-500 to-sky-100 w-3 md:w-6 rounded-full aspect-square animate-[anti-orbit3_infinite_linear_20s]"></div>
      </div>
    </div>
  );
};

export default AnimateCircle;
