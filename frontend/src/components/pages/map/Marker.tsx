import { MapStore } from "@/stores/map.store";
import { Common } from "./map.context";
import UnfocusedLocation from "@/assets/bank-pin-unfocused.svg";
import Location from "@/assets/bank-pin.svg";
import { PointFeature } from "./map.types";

const MarkerBase = (feature: PointFeature) => {
  return (
    <Common.YMapMarker
      key={feature.id}
      coordinates={feature.geometry.coordinates}
      properties={{
        hint: feature.data?.address
      }}
      source="clusterer-source">
      <div
        className="relative cursor-pointer"
        style={{
          transform: "translate(-50%, -75%)"
        }}
        onClick={() => {
          MapStore.onMarkerClick(feature);
        }}>
        <div className="p-3">
          {!MapStore.selectedLocation.item || MapStore.selectedLocation.item.id === feature.id ? (
            <Location />
          ) : (
            <UnfocusedLocation />
          )}
        </div>
      </div>
    </Common.YMapMarker>
  );
};

export const Marker = Object.assign(MarkerBase, {});
