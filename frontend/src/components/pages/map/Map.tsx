import { MapStore } from "@/stores/map.store";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { Common, Cluster as Clusters } from "./map.context";
import { YMapLocationRequest } from "@yandex/ymaps3-types";
import { Marker } from "./Marker";
import { Cluster } from "./Cluster";
import { Sidebar } from "./Sidebar";

export const ELEVATION = {
  Clusters: 1000,
  Sidebar: 200
};

const DEFAULT_LOCATION = {
  center: [37.64, 55.76],
  zoom: 11
} satisfies YMapLocationRequest;

export const Map = observer(() => {
  const vm = MapStore;
  const ref = useRef(null);
  const gridSizedMethod = Clusters.clusterByGrid({ gridSize: 64 });

  useEffect(() => {
    vm.init(ref.current!);
  }, [vm]);

  return (
    <Common.YMap ref={ref} location={DEFAULT_LOCATION} mode="vector">
      <Common.YMapDefaultSchemeLayer />
      <Common.YMapDefaultFeaturesLayer />
      <Common.YMapFeatureDataSource id="clusterer-source" />
      <Common.YMapLayer source="clusterer-source" type="markers" zIndex={ELEVATION.Clusters} />
      <Common.YMapControls position="left">
        <Sidebar vm={vm.selectedLocation} />
      </Common.YMapControls>
      {/* @ts-expect-error deprecated */}
      <Clusters.YMapClusterer
        marker={Marker}
        cluster={Cluster}
        method={gridSizedMethod}
        features={vm.locations}
      />
    </Common.YMap>
  );
});
