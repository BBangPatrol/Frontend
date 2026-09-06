import { api } from "./client";

export type StoreBakery = {
  id: number;
  name: string;
  region: string;
  address: string;
  lat: number;
  lon: number;
  phone: string;
  hours: string;
  avgRating: number | null;
  signatureMenu: string;
  summary: string | null;
  content: string;
  images: string[];
  signatureImages: string[];
};

export type StoreReview = {
  id: number;
  writerId: number;
  writerName: string;
  writerImageUrl: string;
  rating: number;
  content: string;
  keywords: number[];
  images: string[];
  likeCount: number;
  date: string;
};

export type StoreDetail = {
  bakery: StoreBakery;
  visitCnt: number;
  likes: boolean;
};

export type StoreReviews = {
  reviews: StoreReview[];
  pageInfo: {
    size: number;
    hasNext: boolean;
    nextCursor: number | null;
  };
};

export type StoreAttraction = {
  contentId: string;
  category: string;
  name: string;
  address: string;
  imageUrl: string;
  lat: number;
  lng: number;
  distance: number;
  tel: string;
};

export type StoreAttractions = {
  attractions: StoreAttraction[];
};

export type StoreSearchSort = "visit" | "rating" | "distance";

export type StoreSearchBakery = {
  id: number;
  name: string;
  image: string | null;
  avgRating: number | null;
  lat: number;
  lon: number;
  signatureMenu: string;
  signatureImages: string[];
};

export type StoreSearchResult = {
  bakery: StoreSearchBakery;
  visitCnt: number;
  likes: boolean;
};

export type StoreSearch = {
  result: StoreSearchResult[];
  pageInfo: {
    size: number;
    hasNext: boolean;
    nextCursor: number | null;
  };
};

export type StoreSearchParams = {
  sort: StoreSearchSort;
  name?: string;
  lat?: number;
  lon?: number;
  cursor?: number;
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

export type StoreDetailErrorResponse = ApiResponse<null>;

export async function getStoreSearch({ sort, name, lat, lon, cursor }: StoreSearchParams) {
  const response = await api.get<ApiResponse<StoreSearch>>("/stores/search", {
    params: {
      sort,
      name,
      cursor,
      ...(sort === "distance" ? { lat, lon } : {}),
    },
  });

  return response.data.data;
}

export async function getStoreDetail(storeId: string) {
  const response = await api.get<ApiResponse<StoreDetail>>(`/stores/${storeId}/detail`);

  return response.data.data;
}

export async function getStoreReviews(storeId: string) {
  const response = await api.get<ApiResponse<StoreReviews>>(`/stores/${storeId}/reviews`);

  return response.data.data;
}

export async function getStoreAttractions(storeId: string) {
  const response = await api.get<ApiResponse<StoreAttractions>>(`/stores/${storeId}/attractions`);

  return response.data.data;
}
