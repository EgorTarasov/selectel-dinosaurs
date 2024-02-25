import { Map } from "@/components/pages/map/Map";
import { createLazyFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const MapPage = observer(() => {
  return (
    <main className="h-full relative overflow-hidden">
      <Map />
    </main>
  );
});

export const Route = createLazyFileRoute("/map")({
  component: () => <MapPage />
});
