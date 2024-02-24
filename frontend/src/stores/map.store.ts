import { Bank } from "@/api/models";
import { Common } from "@/components/pages/map/map.context";
import { PointFeature } from "@/components/pages/map/map.types";
import { makeAutoObservable } from "mobx";
import { ElementRef } from "react";
import { MapSidebar } from "./map-sidebar.store";

class _MapStore {
  Map: ElementRef<typeof Common.YMap> | null = null;
  locations: PointFeature[] = [];
  selectedLocation: MapSidebar = new MapSidebar();

  constructor() {
    makeAutoObservable(this);
  }

  async init(map: ElementRef<typeof Common.YMap>) {
    this.Map = map;

    // const res = await BanksEndpoint.fetchBanks({});
    const mock: Bank[] = [
      {
        id: 3,
        name: "Шанс Био",
        address: "г. Москва, ул. Гостиничная, дом 10, корп 5",
        longitude: 37.581146,
        latitude: 55.846199,
        advantages: ["Лучший", "Просто чел хорош 2"],
        pricePerMil: 100,
        amountOfBlood: 0,
        phone: "+7 495 260 0 260",
        link: "https://vetlab.ru/",
        dogStorage: {
          DEA_1_1: 700,
          DEA_1_2: 100,
          DEA_3: 501,
          DEA_4: 900,
          DEA_5: 0,
          DEA_7: 0
        },
        catStorage: {
          A: 0,
          B: 0,
          AB: 0
        }
      }
    ];
    const data: PointFeature[] = mock.map((bank) => ({
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
