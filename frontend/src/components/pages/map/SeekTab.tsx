import { MapSidebar } from "@/stores/map-sidebar.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import PhoneIcon from "@/assets/phone.svg";
import { Text } from "@/components/typography/Text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SeekTab: FCVM<MapSidebar> = observer(({ vm }) => {
  if (!vm || !vm.item?.data) return null;

  return (
    <div className="flex flex-col gap-5 mt-2">
      <Text.H4>{vm.item.data.name}</Text.H4>
      <div className="flex flex-col gap-3">
        <Text.UI>{vm.item.data.address}</Text.UI>
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <div className="w-4 h-4">
              <PhoneIcon />
            </div>
            <Text.Small>{vm.item.data.phone}</Text.Small>
          </span>
          <a href={vm.item.data.link} className="text-blue-400 underline hover:no-underline">
            Перейти на сайт банка
          </a>
        </div>
      </div>
      <div className="space-y-2">
        <Text.UiMedium>Нужное количество крови (мл)</Text.UiMedium>
        <div className="flex items-center gap-2">
          <Input
            value={vm.bloodRequiredCount}
            disabled={vm.selectedBloodType === "ALL"}
            placeholder="0"
            className="w-48"
            type="number"
            onChange={(e) => (vm.bloodRequiredCount = e.target.value)}
          />
          <Text.Subtle className="text-slate-400">мл</Text.Subtle>
        </div>
        {vm.selectedBloodType === "ALL" && (
          <Text.Error className="text-left">Сначала выберите группу крови</Text.Error>
        )}
      </div>
      <span className="h-px bg-slate-200 w-full block" />
      {vm.canGetBlood ? (
        <Text.Subtle>{vm.bloodPrice}</Text.Subtle>
      ) : (
        <Text.Error>{vm.bloodPrice}</Text.Error>
      )}
      <Button disabled={!vm.canGetBlood || vm.loading} onClick={() => vm.submit()}>
        Забронировать
      </Button>
    </div>
  );
});
