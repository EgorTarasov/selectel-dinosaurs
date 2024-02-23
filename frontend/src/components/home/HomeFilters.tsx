import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Animal, CatBloodType, DogBloodType } from "@/constants";
import { cn } from "@/lib/utils";
import { HomeStore } from "@/stores/home.service";
import { FCVM } from "@/utils/vm";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

export const HomeFilters: FCVM<HomeStore> = observer(({ vm }) => {
  return (
    <>
      <div className="section mt-9 mb-8">
        <h2 className="font-semibold text-3xl">Данные для поиска</h2>
      </div>

      <div className="section">
        <div className="rounded-xl bg-white border border-gray-200 p-6 w-full">
          <div className="flex gap-5 flex-wrap w-full">
            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="animal">Животное</Label>

              <Select onValueChange={(value: Animal) => vm.setAnimal(value)}>
                <SelectTrigger>
                  <SelectValue placeholder={"Не выбрано"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"Не выбрано"}>Не выбрано</SelectItem>

                  {Object.values(Animal).map((animal) => (
                    <SelectItem key={animal} value={animal}>
                      {animal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="city">Город</Label>
              <Input
                onChange={(e) => (vm.city = e.target.value)}
                type="city"
                id="city"
                placeholder="Город"
              />
            </div>

            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="bloodType">Группа крови</Label>
              <Select
                value={vm.bloodType ?? ""}
                onValueChange={(value: DogBloodType | CatBloodType) => (vm.bloodType = value)}>
                <SelectTrigger>
                  <SelectValue placeholder={"Не выбрана"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"Не выбрана"}>Не выбрана</SelectItem>

                  {vm.blood.length &&
                    vm.blood.map((bloodType) => (
                      <SelectItem key={bloodType} value={bloodType}>
                        {bloodType}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="bloodVolume">Количество крови</Label>
              <Input
                value={vm.bloodVolume?.toString() ?? ""}
                onChange={(e) => vm.setBloodVolume(e.target.value.replace(/[^0-9]/g, ""))}
                type="bloodVolume"
                id="bloodVolume"
                placeholder="0"
              />
            </div>

            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="bloodVolume">Дата окончания поиска</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !vm.expirationDate && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {vm.expirationDate ? (
                      format(vm.expirationDate, "PPP")
                    ) : (
                      <span>Выбирте дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={vm.expirationDate}
                    onSelect={(date) => (vm.expirationDate = date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid flex-auto items-center gap-1.5 mt-5">
              <Button>Найти</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
