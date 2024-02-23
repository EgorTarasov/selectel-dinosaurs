import { MapSidebar } from "@/stores/map-sidebar.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { Cross1Icon } from "@radix-ui/react-icons";
import { MapStore } from "@/stores/map.store";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { useEffect, useState } from "react";
import { DonorTab } from "./DonorTab";
import { SeekTab } from "./SeekTab";

export const Sidebar: FCVM<MapSidebar | null> = observer(({ vm }) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (vm) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [vm]);

  const onCloseClick = () => {
    setHidden(true);
    setTimeout(() => {
      MapStore.selectedLocation = null;
    }, 300);
  };

  return (
    <aside
      className={cn(
        `absolute left-0 min-w-[450px] bottom-0 top-16 bg-white flex flex-col rounded-lg p-5 z-[200]`,
        "transition-all duration-300",
        hidden ? "transform -translate-x-1/2 opacity-0" : "transform translate-x-0 opacity-100"
      )}>
      {vm && (
        <>
          <div className="flex justify-between items-center">
            <Tabs
              activeTab={vm.tab}
              renderTab={(v) => (v === "donor" ? "Донор" : "Больной")}
              variant="secondary"
              onTabChange={(v) => (vm!.tab = v)}
              tabs={["donor", "seek"]}
            />
            <button
              className="rounded-full w-10 h-10 flex items-center justify-center border border-slate-200"
              onClick={onCloseClick}>
              <Cross1Icon />
            </button>
            {vm.tab === "donor" ? <DonorTab vm={vm} /> : <SeekTab vm={vm} />}
          </div>
        </>
      )}
    </aside>
  );
});
