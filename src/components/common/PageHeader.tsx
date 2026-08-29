import { Link } from "react-router";
import type { ReactNode } from "react";

// images
import leftArrowIcon from "@/assets/images/ReviewDetailPage/left-arrow.svg";

type PageHeaderProps = {
  title: string;
  subTitle?: ReactNode;
  icon?: string;
};

export default function PageHeader({ title, subTitle, icon }: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-3 lg:gap-4">
      <Link to={"/detail"} className="flex gap-1">
        <img src={leftArrowIcon} />
        <p className=" text-gray-02 text-sm font-bold">돌아가기</p>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {icon && <img src={icon} alt="" />}
          <h2 className="text-xl font-extrabold text-black-01 lg:text-3xl lg:font-extrabold">{title}</h2>
        </div>
        {subTitle && <p className="text-gray-01 text-xs lg:text-gray-02 lg:text-base font-bold">{subTitle}</p>}
      </div>
    </section>
  );
}
