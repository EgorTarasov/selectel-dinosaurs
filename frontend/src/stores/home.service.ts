import { Bank } from "@/api/models";
import { Animal, CatBloodType, DogBloodType } from "@/constants";
import { log } from "console";
import { makeAutoObservable } from "mobx";

export class HomeStore {
  animal: Animal | null = null;
  city: string | null = null;
  bloodType: DogBloodType | CatBloodType | null = null;
  bloodVolume: number | null = null;
  expirationDate: Date | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get blood() {
    if (this.animal === Animal.Dog) {
      return Object.values(DogBloodType);
    }

    if (this.animal === Animal.Cat) {
      return Object.values(CatBloodType);
    }

    return [...Object.values(DogBloodType), ...Object.values(CatBloodType)];
  }

  setAnimal(animal: Animal) {
    this.animal = animal;
    this.bloodType = null;
  }

  setBloodVolume(bloodVolume: string) {
    if (typeof +bloodVolume === "number") {
      this.bloodVolume = +bloodVolume;
    }
  }
}
