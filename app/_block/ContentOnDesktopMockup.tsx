import Image from "next/image";
import Container from "../_components/ui/Container";
import Button from "../_components/ui/Button";

export interface ContentOnDesktopMockupProps {
  subTitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

const ContentOnDesktopMockup = ({
  subTitle,
  description,
  buttonLabel,
  buttonHref,
}: ContentOnDesktopMockupProps) => {
  return (
    <Container className="rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.25)] mt-20 2xl:max-w-[1090px] mb-[84px]">
      <div className="border-b-[3px] border-primary grid grid-cols-[auto,_1fr,_66px] items-center py-4 px-6 gap-11">
        <div className="flex gap-3 items-center">
          {new Array(3).fill(null).map((_, index) => (
            <div key={index} className="bg-primary rounded-full w-5 h-5" />
          ))}
        </div>
        <div className="bg-primary rounded h-7 w-full" />
        <div className="bg-primary rounded h-7 w-full" />
      </div>
      <div className="flex flex-col items-center justify-center w-full pt-[20px] px-4">
        <Image
          height={400}
          width={400}
          src="/images/404.png"
          alt="404"
          className="object-cover"
        />
        {subTitle && (
          <div className="text-[20px] md:text-[36px] font-bold pb-[12px] leading-normal text-center">
            {subTitle}
          </div>
        )}
        {description && (
          <div className="text-[16px] md:text-[24px] pb-[50px] font-light leading-normal">
            {description}
          </div>
        )}
        {buttonLabel && (
          <Button className="mb-9" href={buttonHref ?? "/"}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </Container>
  );
};

export default ContentOnDesktopMockup;
