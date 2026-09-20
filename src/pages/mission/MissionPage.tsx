import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Pagination from "../../components/common/Pagination";
import PageStatus from "../../components/common/PageStatus";
import MissionList from "../../components/mission/MissionList";
import { useCollectMissionPoint } from "../../hooks/api/useCollectMissionPoint";
import { useMissions } from "../../hooks/api/useMissions";
import medalIcon from "@/assets/images/missionPage/medal.svg";

export default function MissionPage() {
  const [cursorHistory, setCursorHistory] = useState<Array<number | undefined>>([undefined]);
  const cursor = cursorHistory.at(-1);
  const missionsQuery = useMissions(cursor);
  const collectPointMutation = useCollectMissionPoint();

  const handlePageChange = (page: number) => {
    if (page <= cursorHistory.length) {
      setCursorHistory((history) => history.slice(0, page));
      return;
    }

    const nextCursor = missionsQuery.data?.cursorPageInfo.nextCursor;
    if (nextCursor != null) setCursorHistory((history) => [...history, nextCursor]);
  };

  if (missionsQuery.isPending) return <PageStatus message="미션을 불러오는 중입니다." isLoading />;
  if (missionsQuery.isError || !missionsQuery.data) return <PageStatus message="미션을 불러오지 못했습니다." showBackButton={missionsQuery.isError} />;

  return (
    <main className="w-full p-4 flex flex-col gap-5 md:max-w-213 md:mx-auto md:gap-8">
      <PageHeader title="미션 현황" subTitle="다양한 미션 수행으로 포인트를 얻어보세요!" icon={medalIcon} />
      <MissionList
        missions={missionsQuery.data.missions}
        collectingMissionId={collectPointMutation.isPending ? collectPointMutation.variables : null}
        collectedMissionId={collectPointMutation.isSuccess ? collectPointMutation.variables : null}
        onCollectPoint={(missionId) => collectPointMutation.mutate(missionId)}
      />
      <Pagination page={cursorHistory.length} hasNext={missionsQuery.data.cursorPageInfo.hasNext} onPageChange={handlePageChange} />
    </main>
  );
}
