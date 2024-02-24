import { PetsEndpoint } from "@/api/endpoints/pet.endpoint";
import { UserEndpoint } from "@/api/endpoints/user.endpoint";
import { CreatePetParams, Pet } from "@/api/models";
import { UserDto } from "@/api/models/user.model";
import { Animal, CatBloodType, DogBloodType } from "@/constants";
import { makeAutoObservable } from "mobx";
import { AuthService } from "./auth.service";
import { toast } from "@/components/ui/use-toast";

export class ProfileStore {
  tab: "settings" | "pets" = "settings";
  isEditing = false;
  isPetsLoading = false;
  isProfileSubmitDisabled = false;
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
  }

  tempImage: string | null = null;
  async onImageUpload(file: File) {
    if (this.item.loading) return;

    try {
      const res = await UserEndpoint.uploadPicture(file);
      if (res) {
        if (AuthService.auth.state === "authenticated") {
          AuthService.auth.user = res;
        }
        this.item = { loading: false, data: res };
      }
      toast({
        variant: "default",
        title: "Успешно",
        description: "Аватар успешно обновлён"
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось обновить аватар"
      });
    }
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
        this.postPetPhoto(file, index);
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
        avaliable_time: [],
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

  async postPetPhoto(photo: File, index: number) {
    this.pets[index].avatar = await PetsEndpoint.postPetPhoto(photo);

    console.log(this.pets[index].avatar);
  }

  async savePet(index: number) {
    this.isPetsLoading = true;

    const { type, breed, bloodType, name, avatar, age, weight, able_to_donate, vaccines } =
      this.pets[index];

    const payload: CreatePetParams = {
      type,
      breed,
      bloodType,
      name,
      age,
      weight,
      able_to_donate,
      vaccines
    };

    if (avatar !== "") {
      payload.avatar = avatar;
    }

    if (this.getIsNewPet(index)) {
      await PetsEndpoint.createPet(payload)
        .then(() => {
          this.fetchPets();
        })
        .finally(() => {
          this.isPetsLoading = false;
        });
    } else {
      await PetsEndpoint.updatePet({
        id: this.pets[index].id,
        ...payload
      })
        .then(() => {
          this.fetchPets();
        })
        .finally(() => {
          this.isPetsLoading = false;
        });
    }
  }

  async updateUser() {
    if (!this.item.data) return;

    const update: UserDto.Update = {
      email: this.item.data.email,
      first_name: this.item.data.first_name,
      middle_name: this.item.data.middle_name,
      last_name: this.item.data.last_name,
      contact_group: this.item.data.contact_group,
      city: this.item.data.city ?? "",
      wishes: this.item.data.wishes,
      available_weekends_only: this.item.data.available_weekends_only,
      avaliable_time: this.item.data.avaliable_time
    };

    this.isProfileSubmitDisabled = true;

    try {
      const res = await UserEndpoint.updateProfile(update);
      if (res) {
        if (AuthService.auth.state === "authenticated") {
          AuthService.auth.user = res;
        }
        this.item = { loading: false, data: res };
      }
      toast({
        variant: "default",
        title: "Успешно",
        description: "Профиль успешно обновлён"
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось обновить профиль"
      });
    } finally {
      this.isProfileSubmitDisabled = false;
    }
  }
}
