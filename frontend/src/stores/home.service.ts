import { Bank, Donation, SocialDonation } from "@/api/models";
import { Animal, CatBloodType, DogBloodType } from "@/constants";
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
  donations: Donation[] = [
    {
      id: 1,
      date: "2021-10-10",
      amount: 500,
      desctiption: "description",
      pet: {
        id: 1,
        type: "dog",
        breed: "labrador",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Labrador_Retriever_%281210559%29.jpg/800px-Labrador_Retriever_%281210559%29.jpg",
        name: "Барсик",
        age: 5,
        weight: 25,
        able_to_donate: true,
        owner: {
          id: 1,
          name: "Иванов Иван Иванович",
          phone: "+79123456789",
          email: "email",
          city: "Москва"
        },
        donations: [],
        requests: [],
        vaccines: [],
        cooldown_donation_days: 30
      }
    }
  ];
  socialDonations: SocialDonation[] = [
    {
      id: 1,
      city: "Москва",
      name: "Ветлаб",
      link: "https://vetlab.ru/",
      phone: "+74952600260",
      blood: "O+",
      pet: "Кот"
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
