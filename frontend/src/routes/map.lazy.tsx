import { Map } from "@/components/pages/map/Map";
import { MapStore } from "@/stores/map.store";
import { createLazyFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const MapPage = observer(() => {
  const vm = MapStore;

  return (
    <main className="h-full relative">
      <Map />
    </main>
  );
});

export const Route = createLazyFileRoute("/map")({
  component: MapPage
});
