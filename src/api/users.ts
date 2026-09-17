import { authApi } from "./client";
import type { CollectibleRank } from "../types/collectibles";

export type DashboardMission = {
  missionId: number;
  title: string;
  count: number;
  targetCount: number;
  status: "in_progress" | "not_received";
};

export type DashboardData = {
  nickname: string;
  collectionBooks: {
    collected: number;
    total: number;
    items: Array<{
      collectibleId: number;
      name: string;
      rank: CollectibleRank;
      image: string;
    }>;
  };
  point: number;
  reviews: {
    reviewCount: number;
    reviewLikes: number;
  };
  missions: DashboardMission[];
};

export type PointHistoryItem = {
  type: "earn" | "spend";
  content: string;
  amount: number;
  date: string;
};

export type PointHistoryData = {
  point_history: PointHistoryItem[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

export type EditNicknameRequest = {
  nickname: string;
};

export async function getDashboard() {
  const response = await authApi.get<ApiResponse<DashboardData>>("/users/me");
  return response.data.data;
}

export async function getPointHistory(page = 0) {
  const response = await authApi.get<ApiResponse<PointHistoryData>>("/users/me/points", {
    params: { page },
  });
  return response.data.data;
}

export async function editNickname(nickname: string) {
  const response = await authApi.patch("/users/me/edit", {
    nickname,
  });
  return response.status;
}

export async function editProfileImage(profileImage: File) {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  await authApi.post("/users/me/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
