import { useNavigate } from "react-router-dom";
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";
import logoIcon from "@/assets/icon/logo-b.svg";

type PageStatusProps = {
  message: string;
  showBackButton?: boolean;
  isLoading?: boolean;
};

export default function PageStatus({
  message,
  showBackButton = false,
  isLoading = false,
}: PageStatusProps) {
  const navigate = useNavigate();

  return (
    <main className="flex w-full flex-1 items-center justify-center px-4 py-12 md:px-6 md:py-16">
      <section
        role={isLoading ? "status" : "alert"}
        aria-live="polite"
        className="flex w-full max-w-sm flex-col items-center text-center"
      >
        <div
          className={`mb-4 flex size-12 items-center justify-center rounded-full bg-main-05 ${isLoading ? "motion-safe:animate-pulse" : ""}`}
        >
          <img src={logoIcon} alt="" className="size-7" />
        </div>
        <p className="text-gray-01 typo-body-03 md:typo-body-02">{message}</p>
        {showBackButton && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 flex items-center gap-1 text-gray-02 transition-colors hover:text-sub-01"
          >
            <img src={leftArrowIcon} alt="" className="size-3" />
            <span className="typo-body-04 md:typo-body-03">돌아가기</span>
          </button>
        )}
      </section>
    </main>
  );
}
