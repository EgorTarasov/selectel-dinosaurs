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
            <div className="grid min-w-40 flex-auto items-center gap-1.5">
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

            <div className="grid  min-w-40 flex-auto items-center gap-1.5">
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
              <Label htmlFor="bloodVolume">Количество крови, мл</Label>
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
              <Button
                className={`relative min-w-40 ${vm.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => vm.applyFilters()}>
                {!vm.isLoading ? (
                  "Найти"
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.044a4 4 0 10-4 0v0zm2 0A8.001 8.001 0 0120.472 12h3.044a4 4 0 10-3.044-4v0zm0 2A8.001 8.001 0 0112 19.528v3.044a4 4 0 10-4 0v0zm0-2a8.001 8.001 0 01-8-8H0a4 4 0 104 4v0zm8 8a8.001 8.001 0 01-8 8v-3.044a4 4 0 003.044-4h4zm2-5.291v0zM20.472 12v0z"></path>
                    </svg>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
