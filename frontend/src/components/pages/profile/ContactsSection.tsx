import { Text } from "@/components/typography/Text";
import { IconInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { ProfileStore } from "@/stores/profile.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import PhoneIcon from "@/assets/phone.svg";
import EmailIcon from "@/assets/email.svg";
import VkIcon from "@/assets/vk.svg";
import TelegramIcon from "@/assets/telegram.svg";

export const ContactsSection: FCVM<ProfileStore> = observer(({ vm }) => {
  if (vm.item.loading) {
    return <Skeleton className="w-32 h-8" />;
  }

  return (
    <div className="flex flex-col gap-5 w-full items-start">
      <Text.H4>Контакты</Text.H4>
      <div className="flex gap-7 flex-wrap">
        <IconInput
          className="w-[252px]"
          placeholder="Телефон"
          type="tel"
          leftIcon={<PhoneIcon />}
          value={vm.item.data.contact_group?.phone}
          onChange={(v) => (vm.item.data!.contact_group.phone = v.target.value)}
        />
        <IconInput
          className="w-[252px]"
          placeholder="Почта"
          type="email"
          leftIcon={<EmailIcon />}
          value={vm.item.data.contact_group?.email}
          onChange={(v) => (vm.item.data!.contact_group.email = v.target.value)}
        />
        <IconInput
          className="w-[252px]"
          placeholder="Ссылка на VK"
          leftIcon={<VkIcon />}
          disabled
          value={vm.item.data.vkid ? `https://vk.com/id${vm.item.data.vkid}` : "Отсутствует"}
        />
        <IconInput
          className="w-[252px]"
          placeholder="Ник в Telegram"
          leftIcon={<TelegramIcon />}
          disabled
          value="Отсутствует"
        />
      </div>
      <Label className="flex items-center gap-2">
        <Switch
          checked={!vm.item.data.contact_group?.hidden}
          onCheckedChange={(v) => (vm.item.data!.contact_group.hidden = !v)}
        />
        Показывать телефон и почту
      </Label>
    </div>
  );
});
