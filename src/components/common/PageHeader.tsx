import { Link } from "react-router";
import type { ReactNode } from "react";

// images
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";
import { useResponsive } from "../../contexts/ResponsiveContext";

type PageHeaderProps = {
  title: string;
  subTitle?: ReactNode;
  icon?: string;
};

export default function PageHeader(props: PageHeaderProps) {
  const { isMobile } = useResponsive();
  return isMobile ? <MobilePageHeader {...props} /> : <DesktopPageHeader {...props} />;
}

function MobilePageHeader({ title, subTitle, icon }: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-3">
      <Link to={"/detail"} className="flex gap-1 items-center">
        <img src={leftArrowIcon} className="size-3" />
        <p className=" text-gray-02 typo-body-04">돌아가기</p>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {icon && <img src={icon} alt="" />}
          <h2 className="typo-head-02 text-black-01">{title}</h2>
        </div>
        {subTitle && <p className="text-gray-01 typo-body-04">{subTitle}</p>}
      </div>
    </section>
  );
}

function DesktopPageHeader({ title, subTitle, icon }: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-4">
      <Link to={"/detail"} className="flex gap-1">
        <img src={leftArrowIcon} />
        <p className=" text-gray-02 typo-body-03">돌아가기</p>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {icon && <img src={icon} alt="" />}
          <h2 className="text-3xl font-extrabold text-black-01">{title}</h2>
        </div>
        {subTitle && <p className="text-gray-02 typo-body-02">{subTitle}</p>}
      </div>
    </section>
  );
}
