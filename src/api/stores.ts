import { api, authApi } from "./client";

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
  image: string | null;
  summary: string | null;
  content: string;
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
  thumbnails: string[];
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
  count: number;
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
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
};

export type StoreSearchResult = {
  bakery: StoreSearchBakery;
  visitCnt: number;
  likes: boolean;
};

export type StoreSearch = {
  result: StoreSearchResult[];
  cursorPageInfo: {
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

export type ReceiptAnalysisResult = {
  bakeryName: string;
  date: string;
  amount: number;
  menu: string;
  verificationToken: string;
};

export type VisitResult = {
  visitId: number;
  point: number;
};

export type CreateReviewResult = {
  reviewId: number;
};

export type UpdateReviewParams = {
  storeId: string;
  reviewId: number;
  rating: number;
  content: string;
  deleteKeywordIds?: number[];
  keywordIds?: number[];
  deleteImages?: number[];
  reviewImages?: File[];
};

export type StoreApiErrorResponse = {
  isSuccess: false;
  code: string;
  message: string;
  data?: null;
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

export async function getStoreReviews(storeId: string, page = 0) {
  const response = await api.get<ApiResponse<StoreReviews>>(`/stores/${storeId}/reviews`, {
    params: { page },
  });

  return response.data.data;
}

export async function getStoreAttractions(storeId: string) {
  const response = await api.get<ApiResponse<StoreAttractions>>(`/stores/${storeId}/attractions`);

  return response.data.data;
}

export async function analyzeReceipt({ storeId, receipt }: { storeId: string; receipt: File }) {
  const formData = new FormData();
  formData.append("receipt", receipt);

  const response = await authApi.post<ApiResponse<ReceiptAnalysisResult>>(`/stores/${storeId}/visit-verifications`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 0,
  });

  return response.data.data;
}

export async function createVisit({ storeId, totalAmount, date, verificationToken }: { storeId: string; totalAmount: number; date: string; verificationToken: string }) {
  const response = await authApi.post<ApiResponse<VisitResult>>(`/stores/${storeId}/visits`, { totalAmount, date, verificationToken });

  return response.data.data;
}

export async function createReview({ storeId, rating, content, keywordIds, reviewImages }: { storeId: string; rating: number; content: string; keywordIds: number[]; reviewImages: File[] }) {
  const formData = new FormData();
  formData.append("rating", String(rating));
  formData.append("content", content);
  keywordIds.forEach((keywordId) => formData.append("keywordIds", String(keywordId)));
  reviewImages.forEach((reviewImage) => formData.append("reviewImages", reviewImage));

  const response = await authApi.post<ApiResponse<CreateReviewResult>>(`/stores/${storeId}/reviews`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
}

export async function updateReview({ storeId, reviewId, rating, content, deleteKeywordIds = [], keywordIds = [], deleteImages = [], reviewImages = [] }: UpdateReviewParams) {
  const formData = new FormData();
  formData.append("rating", String(rating));
  formData.append("content", content);
  deleteKeywordIds.forEach((keywordId) => formData.append("deleteKeywordIds", String(keywordId)));
  keywordIds.forEach((keywordId) => formData.append("keywordIds", String(keywordId)));
  deleteImages.forEach((imageId) => formData.append("deleteImages", String(imageId)));
  reviewImages.forEach((reviewImage) => formData.append("reviewImages", reviewImage));

  const response = await authApi.patch<ApiResponse<CreateReviewResult>>(`/stores/${storeId}/reviews/${reviewId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
}
