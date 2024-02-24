import VkIcon from "@/assets/vk.svg";
import { Text } from "../typography/Text";
import * as VKID from "@vkid/sdk";

export const VkLoginButton = () => {
  const onClick = () => {
    VKID.Auth.login();
  };

  return (
    <button
      type="button"
      className="flex items-center gap-2 w-full border rounded-md h-9 justify-center hover:bg-slate-50"
      onClick={onClick}>
      <div className="w-5 h-5 flex items-center">
        <VkIcon />
      </div>
      <Text.Small className="text-slate-500" type="button">
        Войти через ВКонтакте
      </Text.Small>
    </button>
  );
};
