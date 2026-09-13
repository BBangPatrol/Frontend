import { authApi } from "./client";

export type MissionStatus = "notReceived" | "inProgress" | "completed" | "fail";

export type Mission = {
  id: number;
  title: string;
  description: string;
  count: number;
  targetCount: number;
  startDate: string | null;
  endDate: string | null;
  completedDate: string | null;
  status: MissionStatus;
  missionType: string;
};

export type Missions = {
  missions: Mission[];
  pageInfo: {
    size: number;
    hasNext: boolean;
    nextCursor: number | null;
  };
};

export type MissionReward = {
  earnPoint: number;
  totalPoint: number;
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

export async function getMissions() {
  const response = await authApi.get<ApiResponse<Missions>>("/missions", {
    params: { filter: "all", size: 20 },
  });

  return response.data.data;
}

export async function collectMissionPoint(missionId: number) {
  const response = await authApi.patch<ApiResponse<MissionReward>>(`/missions/${missionId}`, {});

  return response.data.data;
}
