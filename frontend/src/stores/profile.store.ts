import { UserEndpoint } from "@/api/endpoints/user.endpoint";
import { UserDto } from "@/api/models/user.model";
import { PetsEndpoint } from "@/api/endpoints/pet.endpoint";
import { Pet } from "@/api/models";
import { Animal, CatBloodType, DogBloodType } from "@/constants";
import { makeAutoObservable } from "mobx";

export class ProfileStore {
  tab: "settings" | "pets" = "settings";
  isEditing = false;
  isPetsLoading = false;
  item:
    | {
        loading: false;
        data: UserDto.Item;
      }
    | {
        loading: true;
        data: null;
      } = {
    loading: true,
    data: null
  };

  pets: Pet[] = [];

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  async init() {
    this.item = {
      loading: false,
      data: await UserEndpoint.current()
    };
    this.item.data!.available_time = [
      { start: "10:00", end: "12:00" },
      { start: "13:00", end: "15:00" }
    ];
  }

  tempImage: string | null = null;
  async onImageUpload(file: File) {
    if (this.item.loading) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        this.item.data!.avatar = result;
        console.log(this.item.data!.avatar);
      }
    };
    reader.readAsDataURL(file);
  }

  getBloodTypes(index: number) {
    if (this.pets[index].type === Animal.Dog || this.pets[index].type === "dog") {
      return Object.values(DogBloodType);
    }

    if (this.pets[index].type === Animal.Cat) {
      return Object.values(CatBloodType);
    }

    return [...Object.values(DogBloodType), ...Object.values(CatBloodType)];
  }

  setAnimal(animal: Animal, index: number) {
    this.pets[index].type = animal === Animal.Dog ? "dog" : "cat";
    this.pets[index].bloodType = null;
  }

  setBloodVolume(age: string, index: number) {
    if (typeof +age === "number") {
      this.pets[index].age = +age;
    }
  }

  setWeight(weight: string, index: number) {
    if (typeof +weight === "number") {
      this.pets[index].weight = +weight;
    }
  }

  async onPetImageUpload(file: File, index: number) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        this.pets[index].avatar = result;
        console.log(this.pets[index].avatar);
      }
    };
    reader.readAsDataURL(file);
  }

  async fetchPets() {
    this.isPetsLoading = true;

    this.pets = await PetsEndpoint.fetchOwnPets();

    this.isPetsLoading = false;
  }

  addPet() {
    this.pets.unshift({
      id: Math.floor(Math.random() * 1000) + 1,
      type: "dog",
      breed: "",
      avatar: "",
      name: "",
      age: 0,
      weight: 0,
      able_to_donate: false,
      bloodType: null,
      owner: {
        id: -1,
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        contact_group: {
          hidden: false,
          phone: "",
          email: ""
        },
        city: "",
        vkid: "",
        wishes: "",
        available_weekends_only: false,
        available_time: [],
        avatar: ""
      },
      cooldown_donation_days: 0,
      donations: [],
      requests: [],
      vaccines: []
    });
  }

  getIsNewPet(index: number) {
    return this.pets[index].owner && this.pets[index].owner.id === -1;
  }

  async savePet(index: number) {
    console.log(this.pets[index]);
    this.isPetsLoading = true;

    const { type, breed, bloodType, name, age, weight, able_to_donate, vaccines } =
      this.pets[index];
    console.log(bloodType);

    if (this.getIsNewPet(index)) {
      await PetsEndpoint.createPet({
        type,
        breed,
        bloodType,
        avatar: "https://basetop.ru/wp-content/uploads/2018/10/hrkwaacv.jpg",
        name,
        age,
        weight,
        able_to_donate,
        vaccines
      })
        .then(() => {
          this.fetchPets();
        })
        .finally(() => {
          this.isPetsLoading = false;
        });
    } else {
      await PetsEndpoint.updatePet({
        id: this.pets[index].id,
        type,
        breed,
        bloodType,
        avatar: "https://basetop.ru/wp-content/uploads/2018/10/hrkwaacv.jpg",
        name,
        age,
        weight,
        able_to_donate,
        vaccines
      })
        .then(() => {
          this.fetchPets();
        })
        .finally(() => {
          this.isPetsLoading = false;
        });
    }
  }
}
