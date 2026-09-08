import PageHeader from "../../components/common/PageHeader";
import PageStatus from "../../components/common/PageStatus";
import MissionList from "../../components/mission/MissionList";
import { useCollectMissionPoint } from "../../hooks/useCollectMissionPoint";
import { useMissions } from "../../hooks/useMissions";
import medalIcon from "@/assets/images/missionPage/medal.svg";

export default function MissionPage() {
  const missionsQuery = useMissions();
  const collectPointMutation = useCollectMissionPoint();

  if (missionsQuery.isPending) return <PageStatus message="미션을 불러오는 중입니다." />;
  if (missionsQuery.isError || !missionsQuery.data) return <PageStatus message="미션을 불러오지 못했습니다." />;

  return (
    <main className="p-4 flex flex-col gap-5 md:max-w-213 md:mx-auto md:gap-8">
      <PageHeader title="미션 현황" subTitle="다양한 미션 수행으로 포인트를 얻어보세요!" icon={medalIcon} />
      <MissionList
        missions={missionsQuery.data.missions}
        collectingMissionId={collectPointMutation.isPending ? collectPointMutation.variables : null}
        onCollectPoint={(missionId) => collectPointMutation.mutate(missionId)}
      />
    </main>
  );
}
