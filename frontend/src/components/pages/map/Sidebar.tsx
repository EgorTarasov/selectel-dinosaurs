import { MapSidebar } from "@/stores/map-sidebar.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { DonorTab } from "./DonorTab";
import { SeekTab } from "./SeekTab";
import { BloodFilter } from "./BloodFilter";
import { BankCard } from "./BankCard";
import { IconInput } from "@/components/ui/input";
import SearchIcon from "@/assets/search.svg";
import { SidebarMobile } from "./SidebarMobile";
import { Toaster } from "@/components/ui/toaster";

export const Sidebar: FCVM<MapSidebar> = observer(({ vm }) => {
  const onCloseClick = () => {
    if (vm) {
      vm.item = null;
    }
  };

  return (
    <>
      <SidebarMobile vm={vm} />
      <aside
        className={cn(
          `absolute left-0 max-w-[450px] min-w-[450px] top-0 bottom-0 hidden md:flex flex-col z-[200] p-2`
        )}>
        <Toaster />
        <div className="pointer-events-auto flex flex-col px-5 rounded-lg gap-5 relative overflow-y-auto bg-white shadow-md">
          <div className="flex flex-col gap-5 sticky pt-5 top-0 bg-white">
            <div className="flex justify-between items-center">
              <Tabs
                activeTab={vm.tab}
                renderTab={(v) => (v === "donor" ? "Донор" : "Реципиент")}
                variant="secondary"
                onTabChange={(v) => (vm!.tab = v)}
                tabs={["donor", "seek"]}
                disabled={vm.loading}
              />
              {vm.item && (
                <button
                  disabled={vm.loading}
                  className="rounded-full w-10 h-10 flex items-center justify-center border border-slate-200"
                  onClick={onCloseClick}>
                  <Cross1Icon />
                </button>
              )}
            </div>
            <BloodFilter vm={vm} />
            {!vm.item && (
              <IconInput
                className="bg-gray-100"
                placeholder="Введите название клиники"
                value={vm.search}
                onChange={(e) => (vm.search = e.target.value)}
                leftIcon={<SearchIcon />}
              />
            )}
          </div>
          <div className="flex flex-col flex-1 pb-5">
            {vm.item ? (
              vm.tab === "donor" ? (
                <DonorTab vm={vm} />
              ) : (
                <SeekTab vm={vm} />
              )
            ) : (
              vm.banks.map((v) => (
                <>
                  <BankCard key={v.id} item={v.data!} onClick={() => (vm.item = v)} />
                  <span className="h-px bg-slate-200 my-3 last:hidden" />
                </>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
});
