import { BanksEndpoint } from "@/api/endpoints/banks.endpoint";
import { BloodDonationsEndpoint } from "@/api/endpoints/donations.endpoint";
import { Bank, Donation, FetchBanksParams, SocialDonation } from "@/api/models";
import { Animal, CatBloodType, DogBloodType } from "@/constants";
import { makeAutoObservable } from "mobx";

export class HomeStore {
  isLoading = false;

  animal: Animal | null = Animal.Dog;
  city: string | null = null;
  bloodType: DogBloodType | CatBloodType | null = null;
  bloodVolume: number | null = null;
  expirationDate: Date | undefined;

  banks: Bank[] = [];
  donations: Donation[] = [];
  socialDonations: SocialDonation[] = [];

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

  async applyFilters() {
    this.isLoading = true;

    const params: FetchBanksParams = {
      blood_type: this.bloodType ?? undefined,
      amount: this.bloodVolume ?? undefined,
      city: this.city ?? undefined,
      pet_type: this.animal === Animal.Dog ? "dog" : this.animal === Animal.Cat ? "cat" : undefined,
      due_date: this.expirationDate ? this.expirationDate?.toISOString() : undefined
    };

    try {
      const [banksResponse, donationsResponse, socialDonations] = await Promise.all([
        BanksEndpoint.fetchBanks(params),
        BloodDonationsEndpoint.fetchBloodDonations(params),
        BloodDonationsEndpoint.fetchSocialDonations(params)
      ]);

      this.banks = banksResponse;
      this.donations = donationsResponse;
      this.socialDonations = socialDonations;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      this.isLoading = false;
    }
  }
}
