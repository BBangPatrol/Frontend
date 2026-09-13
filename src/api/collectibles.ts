import { authApi } from "./client";
import type { CollectibleRank } from "../types/collectibles";

export type Collectible = {
  collectibleId: number;
  name: string;
  rank: CollectibleRank;
  image: string;
};

export type DrawCollectibleResult = Collectible & {
  duplicated: boolean;
  refundPoint: number;
  currentPoint: number;
};

export type DrawCollectibleErrorResponse = {
  isSuccess: false;
  code: string;
  message: string;
  data?: null;
};

export type Collectibles = {
  items: Collectible[];
  length: number;
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
};

export async function getMyCollectibles() {
  const response = await authApi.get<ApiResponse<Collectibles>>("/collectibles", {
    params: { type: "me" },
  });

  return response.data.data;
}

export async function getAllCollectibles() {
  const response = await authApi.get<ApiResponse<Collectibles>>("/collectibles", {
    params: { type: "all" },
  });

  return response.data.data;
}

export async function drawCollectible() {
  const response = await authApi.post<ApiResponse<DrawCollectibleResult>>("/collectibles", {});

  return response.data.data;
}
