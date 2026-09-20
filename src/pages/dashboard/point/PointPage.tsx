import pointIcon from "@/assets/images/pointPage/coin.svg";
import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import PageStatus from "../../../components/common/PageStatus";
import DesktopPointHeader from "../../../components/dashboard/point/DesktopPointHeader";
import PointHistory from "../../../components/dashboard/point/PointHistory";
import PointSummary from "../../../components/dashboard/point/PointSummary";
import { useResponsive } from "../../../contexts/ResponsiveContext";
import { useMe } from "../../../hooks/api/useMe";
import { usePointHistory } from "../../../hooks/api/usePointHistory";

export default function PointPage() {
  const { isMobile } = useResponsive();
  const [page, setPage] = useState(0);
  const meQuery = useMe();
  const pointHistoryQuery = usePointHistory(page);

  if (meQuery.isPending || pointHistoryQuery.isPending) return <PageStatus message="포인트 내역을 불러오는 중입니다." isLoading />;
  if (meQuery.isError || pointHistoryQuery.isError || !meQuery.data || !pointHistoryQuery.data) return <PageStatus message="포인트 내역을 불러오지 못했습니다." showBackButton />;

  return (
    <main className="p-4 flex flex-col gap-5 md:max-w-200 md:mx-auto w-full">
      {isMobile ? <PageHeader title="포인트 내역" subTitle="포인트 내역을 확인하고 모은 포인트로 수집품을 뽑아보세요!" icon={pointIcon} /> : <DesktopPointHeader />}
      <PointSummary isMobile={isMobile} point={meQuery.data.point} />
      <PointHistory
        isMobile={isMobile}
        history={pointHistoryQuery.data.point_history}
        page={pointHistoryQuery.data.pageInfo.page}
        totalPages={pointHistoryQuery.data.pageInfo.totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}
