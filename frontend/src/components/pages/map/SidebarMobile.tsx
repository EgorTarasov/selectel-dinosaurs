import { MapSidebar } from "@/stores/map-sidebar.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { DonorTab } from "./DonorTab";
import { SeekTab } from "./SeekTab";
import { BloodFilter } from "./BloodFilter";
import { BankCard } from "./BankCard";
import { IconInput } from "@/components/ui/input";
import SearchIcon from "@/assets/search.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { ELEVATION } from "./Map";
import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export const SidebarMobile: FCVM<MapSidebar> = observer(({ vm }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onCloseClick = () => {
    if (vm) {
      vm.item = null;
    }
  };

  useEffect(() => {
    setDrawerOpen(vm.item !== null);
  }, [vm.item]);

  return (
    <Drawer
      open={drawerOpen && !isDesktop}
      onOpenChange={(v) => {
        if (!v) {
          vm.item = null;
        }
        setDrawerOpen(v);
      }}>
      <DrawerTrigger
        asChild
        style={{ zIndex: ELEVATION.Sidebar }}
        className="absolute max-w-14 max-h-14 bottom-4 right-4 flex md:hidden rounded-lg bg-primary justify-center items-center p-2 text-white">
        <HamburgerMenuIcon className="w-full h-full" />
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          `flex flex-col z-[200] h-[80vh] max-h-[80vh]`,
          "transition-all duration-300"
        )}>
        <DrawerHeader className="flex justify-between">
          <DrawerTitle>Банки</DrawerTitle>
          <DrawerClose onClick={() => (vm.item = null)}>
            <Cross1Icon className="size-6" />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col px-5 rounded-lg gap-5 relative overflow-y-auto">
          <div className="flex flex-col gap-5 sticky top-0 bg-background">
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
      </DrawerContent>
    </Drawer>
  );
});
