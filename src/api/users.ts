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

export async function editProfileImage(profileImage: File) {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  await authApi.post("/users/me/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
