// context
import { useResponsive } from "../../../contexts/ResponsiveContext";

export interface BakeryEmptyReviewCardProps {
  onClick?: () => void;
}

export default function BakeryReviewCard({
  onClick,
}: BakeryEmptyReviewCardProps) {
  const commonProps = { onClick };

  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileEmptyReviewCard {...commonProps} />
  ) : (
    <DesktopEmptyReviewCard {...commonProps} />
  );
}

function DesktopEmptyReviewCard({ onClick }: BakeryEmptyReviewCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex w-full h-108
        flex-col items-center justify-center
        rounded-3xl
        border-2 border-dashed border-gray-03
        bg-gray-05
        transition-colors duration-200
        hover:bg-gray-04
      "
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-04">
        <span className="text-3xl font-light leading-none text-gray-02">+</span>
      </div>

      <p className="typo-head-04 text-gray-01">새로운 빵집을 찾아보세요</p>

      <p className="mt-1 typo-body-04 text-gray-02">
        아직 방문한 빵집이 없어요
      </p>
    </button>
  );
}

function MobileEmptyReviewCard({ onClick }: BakeryEmptyReviewCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex w-full h-32
        flex-col items-center justify-center
        rounded-xl
        border-2 border-dashed border-gray-03
        bg-gray-05
        transition-colors duration-200
        hover:bg-gray-04
      "
    >
      <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-04">
        <span className="text-xl font-light leading-none text-gray-02">+</span>
      </div>

      <p className="typo-body-03 text-gray-01">새로운 빵집을 찾아보세요</p>

      <p className="mt-0.5 typo-sub-03 text-gray-02">
        아직 방문한 빵집이 없어요
      </p>
    </button>
  );
}
