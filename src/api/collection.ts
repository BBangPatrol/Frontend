import { authApi } from "./client";

export type Collection = {
  visits: Visit[];
};

export type Visit = {
  storeId: number;
  storeName: string;
  storeImageUrl: string;
  visitDate: string;
  state: "none" | "reviewed" | "expired";
  reviewId: number | null;
  rating: number | null;
  reviewContent: string | null;
  reviewDeadline: string | null;
  remainingDays?: number | null;
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

{
  /* 콜렉션 조회 */
}
export async function getCollection() {
  const response = await authApi.get<ApiResponse<Collection>>(
    "/users/me/bread-collections",
  );

  return response.data.data;
}
