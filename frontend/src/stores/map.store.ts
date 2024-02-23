import { Bank } from "@/api/models";
import { Common } from "@/components/pages/map/map.context";
import { PointFeature } from "@/components/pages/map/map.types";
import { makeAutoObservable } from "mobx";
import { ElementRef } from "react";
import { MapSidebar } from "./map-sidebar.store";

class _MapStore {
  Map: ElementRef<typeof Common.YMap> | null = null;
  locations: PointFeature[] = [];
  selectedLocation: MapSidebar | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async init(map: ElementRef<typeof Common.YMap>) {
    this.Map = map;

    // const res = await BanksEndpoint.fetchBanks({});
    const mock: Bank[] = [
      {
        id: 3,
        name: "Vet Unio",
        address: " г. Москва, ул. Профсоюзная, д. 45",
        longitude: 37.552148,
        latitude: 55.666599,
        pricePerMil: 1000,
        amountOfBlood: 0,
        phone: "8 (800) 200 85 65",
        link: "https://vetunion.ru/lab/",
        dogStorage: {
          DEA_1_1: 0,
          DEA_1_2: 0,
          DEA_3: 0,
          DEA_4: 0,
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
    console.log(data);
  }

  onMarkerClick(location: PointFeature) {
    this.selectedLocation = new MapSidebar(location);
  }
}

export const MapStore = new _MapStore();
