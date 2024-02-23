import { Text } from "@/components/typography/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ProfileStore } from "@/stores/profile.store";
import { FCVM } from "@/utils/vm";
import { MinusCircledIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";

export const CommunicationSection: FCVM<ProfileStore> = observer(({ vm }) => {
  if (vm.item.loading) {
    return <Skeleton className="w-32 h-8" />;
  }

  const isValidTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const formatHours = (hours: string) => {
    const h = Number(hours);
    if (h < 0) return "00";
    if (h > 23) return "23";
    return h.toString().padStart(2, "0");
  };

  const formatMinutes = (minutes: string) => {
    const m = Number(minutes);
    if (m < 0) return "00";
    if (m > 59) return "59";
    return m.toString().padStart(2, "0");
  };

  return (
    <div className="flex w-full flex-col sm:flex-row gap-16">
      <div className="flex flex-col flex-1">
        <Text.H4>Предпочтения</Text.H4>
        <Text.Small className="mt-5 mb-2">Дополнительная информация</Text.Small>
        <Textarea
          className="w-full min-h-24"
          placeholder="Покормите моего питомца после сдачи крови"
          value={vm.item.data.wishes}
          onChange={(v) => (vm.item.data!.wishes = v.target.value)}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <Text.H4>Время, когда с вами можно связаться</Text.H4>
        <Label className="flex items-center gap-2 mt-5 mb-4">
          <Switch
            checked={vm.item.data.available_weekends_only}
            onCheckedChange={(v) => (vm.item.data!.available_weekends_only = v)}
          />
          Только в выходные
        </Label>
        <ul className="flex flex-col gap-3">
          {vm.item.data.available_time.map((v, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Input
                  className="w-16 aspect-square"
                  type="number"
                  placeholder="00"
                  max={23}
                  value={Number(v.start.split(":")[0])}
                  onChange={(e) => {
                    const value = `${formatHours(e.target.value)}:${v.start.split(":")[1]}`;
                    if (isValidTime(value)) {
                      v.start = value;
                    }
                  }}
                />
                <span>:</span>
                <Input
                  className="w-16 aspect-square"
                  type="number"
                  max={59}
                  placeholder="00"
                  value={Number(v.start.split(":")[1])}
                  onChange={(e) => {
                    const value = `${v.start.split(":")[0]}:${formatMinutes(e.target.value)}`;
                    if (isValidTime(value)) {
                      v.start = value;
                    }
                  }}
                />
                <span> — </span>
                <Input
                  className="w-16 aspect-square"
                  type="number"
                  max={23}
                  placeholder="00"
                  value={Number(v.end.split(":")[0])}
                  onChange={(e) => {
                    const value = `${formatHours(e.target.value)}:${v.end.split(":")[1]}`;
                    if (isValidTime(value)) {
                      v.end = value;
                    }
                  }}
                />
                <span>:</span>
                <Input
                  className="w-16 aspect-square"
                  type="number"
                  max={59}
                  placeholder="00"
                  value={Number(v.end.split(":")[1])}
                  onChange={(e) => {
                    const value = `${v.end.split(":")[0]}:${formatMinutes(e.target.value)}`;
                    if (isValidTime(value)) {
                      v.end = value;
                    }
                  }}
                />
              </div>
              <Button
                size="icon"
                className="w-fit"
                variant="ghost"
                onClick={() => vm.item.data!.available_time.splice(i, 1)}>
                <MinusCircledIcon />
              </Button>
            </li>
          ))}
          <Button
            className="w-fit"
            variant="secondary"
            onClick={() => vm.item.data!.available_time.push({ start: "9:00", end: "17:00" })}>
            Добавить время
          </Button>
        </ul>
      </div>
    </div>
  );
});
