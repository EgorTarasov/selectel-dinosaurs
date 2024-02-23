import { UserDto } from "api/models/user.model";
import api from "api/utils/api";

export namespace UserEndpoint {
  export const current = async () => {
    return await api.get<UserDto.Item>("/api/user/me");
  };
}
