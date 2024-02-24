import { Bank } from "@/api/models";
import { Feature } from "@yandex/ymaps3-types/packages/clusterer";

export interface PointFeature extends Feature {
  data?: Bank;
}
