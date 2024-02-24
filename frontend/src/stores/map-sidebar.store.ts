import { PointFeature } from "@/components/pages/map/map.types";
import { CatBloodType, DogBloodType } from "@/constants";
import { makeAutoObservable } from "mobx";
import { MapStore } from "./map.store";
import { BankRequestEndpoint } from "@/api/endpoints/bank-request.endpoint";
import { toast } from "@/components/ui/use-toast";
import { BankDonationEndpoint } from "@/api/endpoints/bank-donation.endpoint";
import { BankDonationDto } from "@/api/models/bank-donation.model";

const BLOOD_PRICE_RUB = 350;
const DEFICIT_COEF = {
  low: 1.3,
  medium: 1.2,
  high: 1
};

export class MapSidebar {
  date?: Date;
  time: string | null = null;
  item: PointFeature | null = null;
  tab: "donor" | "seek" = "donor";
  search: string = "";
  selectedBloodType: string = "ALL";
  private _animalType: "dog" | "cat" = "dog";
  get animalType() {
    return this._animalType;
  }
  set animalType(value: "dog" | "cat") {
    this._animalType = value;
    this.selectedBloodType = "ALL";
  }
  get bloodTypes(): string[] {
    return [
      "ALL",
      ...(this.animalType === "dog" ? Object.keys(DogBloodType) : Object.keys(CatBloodType))
    ];
  }

  get banks() {
    const items = MapStore.locations.filter(
      (v) =>
        v.data &&
        (this.selectedBloodType === "ALL"
          ? this.animalType === "dog"
            ? Object.keys(DogBloodType).some(
                (type) => v.data!.dogStorage[type as keyof typeof DogBloodType] > 0
              )
            : Object.keys(CatBloodType).some(
                (type) => v.data!.catStorage[type as keyof typeof CatBloodType] > 0
              )
          : this.animalType === "dog"
            ? v.data!.dogStorage[this.selectedBloodType as keyof typeof DogBloodType] > 0
            : v.data!.catStorage[this.selectedBloodType as keyof typeof CatBloodType] > 0) &&
        v.data!.name.toLowerCase().includes(this.search.toLowerCase())
    );

    return items;
  }

  get bloodCount(): Array<{ type: string; level: "low" | "medium" | "high" }> {
    const result: Array<{ type: string; level: "low" | "medium" | "high" }> = [];
    for (const type of Object.keys(this.animalType === "dog" ? DogBloodType : CatBloodType)) {
      const count =
        this.animalType === "dog"
          ? this.item?.data?.dogStorage[type as keyof typeof DogBloodType] ?? 0
          : this.item?.data?.catStorage[type as keyof typeof CatBloodType] ?? 0;

      let level: "low" | "medium" | "high";
      if (count < 500) {
        level = "low";
      } else if (count < 800) {
        level = "medium";
      } else {
        level = "high";
      }

      result.push({ type, level });
    }

    return result;
  }

  bloodRequiredCount: string = "";

  errorText: string | null = null;
  loading = false;
  canGetBlood = false;
  get bloodPrice(): string {
    this.canGetBlood = false;
    if (this.selectedBloodType === "ALL" || !this.item?.data) {
      return "Выберите группу крови";
    }

    const maxAmount =
      this.animalType === "dog"
        ? this.item.data.dogStorage[this.selectedBloodType as keyof typeof DogBloodType]
        : this.item.data.catStorage[this.selectedBloodType as keyof typeof CatBloodType];

    if (Number(this.bloodRequiredCount) < 0) {
      return "Введите корректное количество крови";
    }

    if (maxAmount === 0 || Number(this.bloodRequiredCount) > maxAmount) {
      return "В банке недостаточно крови";
    }

    this.canGetBlood = true;
    return (
      (
        Number(this.bloodRequiredCount) *
        BLOOD_PRICE_RUB *
        DEFICIT_COEF[this.bloodCount.find((v) => v.type === this.selectedBloodType)!.level]
      ).toFixed(2) + " руб"
    );
  }

  async submit() {
    this.errorText = null;

    if (this.tab === "donor") {
      if (!this.date) {
        this.errorText = "Выберите дату";
        return;
      }

      if (!this.time) {
        this.errorText = "Выберите время";
        return;
      }

      const template = {
        date: this.date,
        time: this.time,
        animal_type: this.animalType,
        blood_type: this.selectedBloodType,
        count: Number(this.bloodRequiredCount),
        bank: this.item!.data!.id
      };

      await BankRequestEndpoint.create(template);
      toast({
        title: "Успешно",
        description: "Заявка успешно отправлена"
      });
      this.item = null;
    } else {
      if (this.selectedBloodType === "ALL") {
        this.errorText = "Выберите группу крови";
        return;
      }

      if (this.item?.data) {
        const maxAmount =
          this.animalType === "dog"
            ? this.item.data.dogStorage[this.selectedBloodType as keyof typeof DogBloodType]
            : this.item.data.catStorage[this.selectedBloodType as keyof typeof CatBloodType];

        if (maxAmount === 0) {
          this.errorText = "В банке недостаточно крови";
          return;
        }
      }

      if (Number(this.bloodRequiredCount) === 0) {
        this.errorText = "Введите количество крови";
        return;
      }

      const template: BankDonationDto.Template = {
        animal_type: this.animalType,
        blood_type: this.selectedBloodType,
        count: Number(this.bloodRequiredCount),
        bank: this.item!.data!.id,
        date: new Date(),
        time: new Date().toLocaleTimeString()
      };

      await BankDonationEndpoint.create(template);
      toast({
        title: "Успешно",
        description: "Заявка успешно отправлена"
      });

      this.item = null;
    }
  }

  constructor() {
    makeAutoObservable(this);
  }
}
