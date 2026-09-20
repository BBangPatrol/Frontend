import { authApi } from "./client";

{
  /* 내 주변 가게 api type */
}
export type Store = {
  storeId: number;
  storeName: string;
  rating: number;
  region: string;
  imageUrl: string;
};

export type ResponseStore = {
  stores: Store[];
};

{
  /* 미션 조회 api type */
}
export type MissionStatus =
  | "notReceived"
  | "inProgress"
  | "completed"
  | "failed";
export type MissionType = "receipt" | "review" | "bakery" | "collection";

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
  missionType: MissionType;
};

export type ResponseMissions = {
  missions: Mission[];
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

{
  /* 내 주변 가게 조회 */
}
export async function getHotStores() {
  const response = await authApi.get<ApiResponse<ResponseStore>>("/stores/hot");

  return response.data.data;
}

{
  /* 미션 조회 */
}
export async function getMissions() {
  const response =
    await authApi.get<ApiResponse<ResponseMissions>>("/missions");

  return response.data.data;
}
