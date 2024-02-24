import { Skeleton } from "@/components/ui/skeleton";
import { ProfileStore } from "@/stores/profile.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { Avatar } from "./Avatar";
import { Text } from "@/components/typography/Text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const NameSection: FCVM<ProfileStore> = observer(({ vm }) => {
  if (vm.item.loading) {
    return <Skeleton className="w-32 h-8" />;
  }

  return (
    <div className="flex items-center gap-9 flex-col md:flex-row mt-6 md:mt-0">
      <Avatar vm={vm} />
      <div className="flex flex-col justify-between h-full">
        <Text.H4>Основное</Text.H4>
        <div className="flex gap-5 flex-wrap">
          <fieldset className="gap-2 flex flex-col">
            <Label htmlFor="first_name">Имя</Label>
            <Input
              id="first_name"
              value={vm.item.data.first_name}
              onChange={(v) => (vm.item.data!.first_name = v.target.value)}
            />
          </fieldset>
          <fieldset className="gap-2 flex flex-col">
            <Label htmlFor="last_name">Фамилия</Label>
            <Input
              id="last_name"
              value={vm.item.data.last_name}
              onChange={(v) => (vm.item.data!.last_name = v.target.value)}
            />
          </fieldset>
          <fieldset className="gap-2 flex flex-col">
            <Label htmlFor="city">Город</Label>
            <Input
              id="city"
              value={vm.item.data.city ?? ""}
              onChange={(v) => (vm.item.data!.city = v.target.value)}
            />
          </fieldset>
        </div>
      </div>
    </div>
  );
});
