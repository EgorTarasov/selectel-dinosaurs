import { PointFeature } from "@/components/pages/map/map.types";
import { CatBloodType, DogBloodType } from "@/constants";
import { makeAutoObservable } from "mobx";

type AnimalType =
  | {
      type: "dog";
      bloodType: string; // keyof typeof DogBloodType;
    }
  | {
      type: "cat";
      bloodType: string;
    };

export class MapSidebar {
  tab: "donor" | "seek" = "donor";
  animal: AnimalType = { type: "dog", bloodType: DogBloodType.DEA_1_1 };
  constructor(public item: PointFeature) {
    makeAutoObservable(this);
  }
}
