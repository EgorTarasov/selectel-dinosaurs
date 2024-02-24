import { MapSidebar } from "@/stores/map-sidebar.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { Text } from "@/components/typography/Text";
import PhoneIcon from "@/assets/phone.svg";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ELEVATION } from "./Map";
import { ru } from "date-fns/locale";

const TimePill = (x: { className: string; children: ReactNode }) => {
  return (
    <li className="flex items-center gap-1.5">
      <div className={cn("rounded-full w-3 h-3", x.className)}></div>
      <Text.Detail>{x.children}</Text.Detail>
    </li>
  );
};

const AVAILABLE_TIME = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00"
];

export const DonorTab: FCVM<MapSidebar> = observer(({ vm }) => {
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
      {vm.item.data.advantages && (
        <>
          <Text.UiMedium>Преимущества</Text.UiMedium>
          <ul className="space-y-2">
            {vm.item.data.advantages.map((advantage, index) => (
              <li key={index} className="flex rounded-2xl bg-green-50 py-2 px-3">
                <Text.Subtle>{advantage}</Text.Subtle>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="flex flex-col gap-3">
        <Text.H4>Количество кровепродуктов</Text.H4>
        <ul className="flex flex-wrap gap-3">
          <TimePill className="bg-green-700">Достаточно</TimePill>
          <TimePill className="bg-blue-700">Ожидается нехватка</TimePill>
          <TimePill className="bg-red-700">Нехватка</TimePill>
        </ul>
        <ul className="flex flex-wrap gap-3">
          {vm.bloodCount.map((product, index) => (
            <li
              key={index}
              className={cn(
                "border rounded-md w-24 py-2 flex items-center justify-center",
                product.level === "low" && "text-red-700 border-red-700 bg-red-50",
                product.level === "medium" && "text-blue-700 border-blue-700 bg-blue-50",
                product.level === "high" && "text-green-700 border-green-700 bg-green-50"
              )}>
              <Text.SubleSemi>{product.type}</Text.SubleSemi>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <Text.UiMedium>Выберите время посещения клиники</Text.UiMedium>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              disabled={vm.loading}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !vm.date && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {vm.date ? format(vm.date, "PPP", { locale: ru }) : <span>Выберите дату</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" style={{ zIndex: ELEVATION.Sidebar + 1 }}>
            <Calendar
              mode="single"
              selected={vm.date}
              onSelect={(v) => (vm.date = v)}
              disabled={(v) => v.getTime() < new Date().setHours(0, 0, 0, 0)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <ul className="flex flex-wrap gap-2 mb-2">
          {AVAILABLE_TIME.map((time) => (
            <li key={time} className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={vm.loading}
                onClick={() => (vm.time === time ? (vm.time = null) : (vm.time = time))}
                className={cn(
                  "w-14",
                  vm.time === time ? "!bg-primary !text-primary-foreground" : "bg-background"
                )}>
                {time}
              </Button>
            </li>
          ))}
        </ul>
        {vm.errorText && <Text.Error>{vm.errorText}</Text.Error>}
        <Button disabled={vm.loading} onClick={() => vm.submit()}>
          Записаться на донацию
        </Button>
      </div>
    </div>
  );
});
