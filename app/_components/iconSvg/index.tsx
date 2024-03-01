export const BgCircle = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="576"
      height="576"
      viewBox="0 0 739 838"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_f_1_649)">
        <circle cx="320" cy="419" r="288" fill="#ABE1F2" fillOpacity="0.3" />
      </g>
      <defs>
        <filter
          id="filter0_f_1_649"
          x="-99"
          y="0"
          width="838"
          height="838"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="65.5"
            result="effect1_foregroundBlur_1_649"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const BgCircle2 = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="721"
      height="721"
      viewBox="0 0 721 721"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_f_1_647)">
        <circle
          cx="360.5"
          cy="360.5"
          r="229.5"
          fill="#ABE1F2"
          fillOpacity="0.7"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1_647"
          x="0"
          y="0"
          width="721"
          height="721"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="65.5"
            result="effect1_foregroundBlur_1_647"
          />
        </filter>
      </defs>
    </svg>
  );
};
