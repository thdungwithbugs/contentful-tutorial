import { ContentOnDesktopMockup } from "./_block";

export default async function NotFound() {
  return (
    <ContentOnDesktopMockup
      subTitle={"Không tìm thấy trang cần tìm"}
      description={"Vui lòng trở về trang chủ"}
      buttonHref="/"
      buttonLabel="Về trang chủ"
    />
  );
}
