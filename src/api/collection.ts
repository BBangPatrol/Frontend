import { authApi } from "./client";

export interface Collection {
  visits: Visit[];
}

export interface Visit {
  storeId: number;
  storeName: string;
  storeImageUrl: string;
  visitDate: string;
  state: "none" | "reviewed" | "expired";
  visitDetailId: number;
  review: Review | null;
  reviewDeadline: string | null;
  remainingDays?: number | null;
}
export interface Review {
  id: number;
  rating: number;
  content: string;
  keywords: number[];
  images: string[];
  thumbnails: string[];
}

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

{
  /* 콜렉션 조회 */
}
export async function getCollection(query?: string) {
  const response = await authApi.get<ApiResponse<Collection>>(
    "/users/me/bread-collections",
    { params: { query } },
  );

  return response.data.data;
}
