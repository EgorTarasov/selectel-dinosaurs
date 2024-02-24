import { UserDto } from "api/models/user.model";
import api from "api/utils/api";

export namespace UserEndpoint {
  export const current = async () => {
    return await api.get<UserDto.Item>("/api/user/me");
  };

  export const uploadPicture = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return await api.put<UserDto.Item>("/api/user/profile/picture", formData);
  };

  export const updateProfile = async (data: UserDto.Update) => {
    return await api.put<UserDto.Item>("/api/user/profile", data);
  };
}
