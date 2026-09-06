import { authApi } from "./client";

export type Collectible = {
  collectibleId: number;
  name: string;
  rank: string;
  image: string;
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
