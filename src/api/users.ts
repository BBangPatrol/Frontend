import { authApi } from "./client";

export type EditNicknameRequest = {
  nickname: string;
};

export async function editNickname(nickname: string) {
  const response = await authApi.patch("/users/me/edit", {
    nickname,
  });
  return response.status;
}
1;
