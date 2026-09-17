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

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

export type EditNicknameRequest = {
  nickname: string;
};

export type ReviewData = {
  reviews: review[];
  reviewCount: number;
  reviewLikes: number;
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
};

export type review = {
  bakeryId: number;
  bakeryName: string;
  reviewId: number;
  rating: number;
  content: string;
  likeCount: number;
  date: string;
};

export async function getDashboard() {
  const response = await authApi.get<ApiResponse<DashboardData>>("/users/me");
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

export async function getMyReviews(page: number) {
  const response = await authApi.get<ApiResponse<ReviewData>>(
    `/users/me/reviews?page=${page}`,
  );
  return response.data.data;
}
