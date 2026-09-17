import Mission from "./Mission";
import type { Mission as MissionData } from "../../api/missions";

type MissionListProps = {
  missions: MissionData[];
  collectingMissionId: number | null;
  collectedMissionId: number | null;
  onCollectPoint: (missionId: number) => void;
};

export default function MissionList({ missions, collectingMissionId, collectedMissionId, onCollectPoint }: MissionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {missions.map((mission) => (
        <Mission key={mission.id} mission={mission} isCollecting={collectingMissionId === mission.id} isJustCollected={collectedMissionId === mission.id} onCollectPoint={onCollectPoint} />
      ))}
    </div>
  );
}
