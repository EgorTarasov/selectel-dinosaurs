import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { MapSidebar } from "@/stores/map-sidebar.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";

export const DonorTab: FCVM<MapSidebar> = observer(({ vm }) => {
  if (!vm) return null;

  return (
    <>
      <Label htmlFor="bloodType">Группа крови</Label>
      <Select onValueChange={(value) => (vm.animal.bloodType = value)}></Select>
    </>
  );
});
