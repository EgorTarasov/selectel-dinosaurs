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

  banks: Bank[] = [
    {
      id: 1,
      name: "ШансБио",
      address: "г. Москва, Электролитный проезд, дом 3 стр. 12",
      city: "Электролитный проезд",
      pricePerMil: 250,
      amountOfBlood: 900,
      phone: "+74952600260",
      link: "https://vetlab.ru/"
    },
    {
      id: 2,
      name: "Vet Union",
      address: "г. Москва, ул. Профсоюзная, д. 45",
      city: "ул. Профсоюзная",
      pricePerMil: 400,
      amountOfBlood: 800,
      phone: "+78002008565",
      link: "https://vetunion.ru/lab/"
    }
  ];

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
