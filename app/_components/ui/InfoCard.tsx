import Image from "next/image";

const CardIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="64"
      viewBox="0 0 65 64"
      fill="none"
    >
      <path
        d="M26.3319 27C26.3319 29.2367 24.5187 31.05 22.2819 31.05C20.0452 31.05 18.2319 29.2367 18.2319 27C18.2319 24.7632 20.0452 22.95 22.2819 22.95C24.5187 22.95 26.3319 24.7632 26.3319 27ZM15.5319 35.775C15.5319 34.6566 16.4385 33.75 17.5569 33.75H27.0069C28.1253 33.75 29.0319 34.6566 29.0319 35.775V36.45C29.0319 36.45 29.0319 41.85 22.2819 41.85C15.5319 41.85 15.5319 36.45 15.5319 36.45V35.775ZM34.4319 27.3375C34.4319 26.4055 35.1874 25.65 36.1194 25.65H48.9444C49.8764 25.65 50.6319 26.4055 50.6319 27.3375C50.6319 28.2695 49.8764 29.025 48.9444 29.025H36.1194C35.1874 29.025 34.4319 28.2695 34.4319 27.3375ZM36.1194 35.1C35.1874 35.1 34.4319 35.8555 34.4319 36.7875C34.4319 37.7195 35.1874 38.475 36.1194 38.475H48.9444C49.8764 38.475 50.6319 37.7195 50.6319 36.7875C50.6319 35.8555 49.8764 35.1 48.9444 35.1H36.1194ZM6.08191 16.5375C6.08191 13.3688 8.65067 10.8 11.8194 10.8H54.3444C57.5131 10.8 60.0819 13.3688 60.0819 16.5375V48.2625C60.0819 51.4312 57.5131 54 54.3444 54H11.8194C8.65067 54 6.08191 51.4312 6.08191 48.2625V16.5375ZM11.8194 14.175C10.5146 14.175 9.45691 15.2327 9.45691 16.5375V48.2625C9.45691 49.5673 10.5146 50.625 11.8194 50.625H54.3444C55.6492 50.625 56.7069 49.5673 56.7069 48.2625V16.5375C56.7069 15.2327 55.6492 14.175 54.3444 14.175H11.8194Z"
        fill="url(#paint0_linear_1_711)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_711"
          x1="1000.82"
          y1="56.8454"
          x2="475.812"
          y2="-795.713"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3285E1" />
          <stop offset="1" stopColor="#82D2FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const InfoCard = ({
  icon,
  name,
  desc,
}: {
  icon?: string;
  name: string;
  desc: string;
}) => {
  return (
    <div className="p-3 md:p-6 rounded shadow-[inset_-2px_8px_40px_#ABE1F2] hover:shadow-md transition-all group">
      <div className="flex flex-col gap-[10px] items-center justify-center">
        {icon ? (
          <Image
            height={100}
            width={100}
            alt="logo card"
            quality={95}
            src={icon}
            className="object-contain h-16 w-16"
          />
        ) : (
          <CardIcon />
        )}
        <span className="md:text-2xl font-medium">{name}</span>
        <span className="md:text-xl leading-normal text-center">{desc}</span>
      </div>
    </div>
  );
};

export default InfoCard;
