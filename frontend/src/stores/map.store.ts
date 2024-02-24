import { Common } from "@/components/pages/map/map.context";
import { PointFeature } from "@/components/pages/map/map.types";
import { makeAutoObservable } from "mobx";
import { ElementRef } from "react";
import { MapSidebar } from "./map-sidebar.store";
import { BanksEndpoint } from "@/api/endpoints/banks.endpoint";

class _MapStore {
  Map: ElementRef<typeof Common.YMap> | null = null;
  locations: PointFeature[] = [];
  selectedLocation: MapSidebar = new MapSidebar();

  constructor() {
    makeAutoObservable(this);
  }

  async init(map: ElementRef<typeof Common.YMap>) {
    this.Map = map;

    const [banks] = await Promise.all([BanksEndpoint.fetchBanks({})]);

    const data: PointFeature[] = banks.map((bank) => ({
      id: bank.id.toString(),
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [bank.longitude, bank.latitude]
      },
      data: bank
    }));

    this.locations = data;
  }

  onMarkerClick(location: PointFeature) {
    this.selectedLocation.item = location;
  }
}

export const MapStore = new _MapStore();
