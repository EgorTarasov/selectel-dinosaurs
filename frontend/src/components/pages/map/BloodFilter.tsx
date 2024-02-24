import { MapSidebar } from "@/stores/map-sidebar.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ELEVATION } from "./Map";
import { CatBloodType, DogBloodType } from "@/constants";

export const BloodFilter: FCVM<MapSidebar> = observer(({ vm }) => {
  return (
    <fieldset className="flex gap-5">
      <div className="flex flex-1 flex-col gap-2">
        <Label>Тип животного</Label>
        <Select
          value={vm.animalType}
          onValueChange={(value) => (vm.animalType = value as "dog" | "cat")}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ zIndex: ELEVATION.Sidebar + 1 }}>
            {["dog", "cat"].map((animalType) => (
              <SelectItem key={animalType} value={animalType}>
                {animalType === "dog" ? "Собака" : "Кошка"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Label>Группа крови</Label>
        <Select
          value={vm.selectedBloodType}
          onValueChange={(value) => value !== "" && (vm.selectedBloodType = value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ zIndex: ELEVATION.Sidebar + 1 }}>
            {vm.bloodTypes.map((bloodType) => (
              <SelectItem key={bloodType} value={bloodType}>
                {bloodType === "ALL"
                  ? "Все"
                  : DogBloodType[bloodType as keyof typeof DogBloodType] ??
                    CatBloodType[bloodType as keyof typeof CatBloodType]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </fieldset>
  );
});
