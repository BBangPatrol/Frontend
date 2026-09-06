import { useNavigate } from "react-router";
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";

type PageStatusProps = {
  message: string;
};

export default function PageStatus({ message }: PageStatusProps) {
  const navigate = useNavigate();

  return (
    <main className="p-4 md:p-6">
      <section className="flex flex-col gap-3 md:gap-4">
        <button type="button" onClick={() => navigate(-1)} className="flex gap-1 items-center self-start">
          <img src={leftArrowIcon} alt="" className="size-3 md:size-auto" />
          <span className="text-gray-02 typo-body-04 md:typo-body-03">돌아가기</span>
        </button>
        <p>{message}</p>
      </section>
    </main>
  );
}
