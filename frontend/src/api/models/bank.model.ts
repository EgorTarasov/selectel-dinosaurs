import { CatBloodType, DogBloodType } from "@/constants";

export interface Bank {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  pricePerMil: number;
  amountOfBlood: number;
  advantages: string[] | null;
  phone: string;
  link: string;
  dogStorage: Record<keyof typeof DogBloodType, number>;
  catStorage: Record<keyof typeof CatBloodType, number>;
}

export interface FetchBanksParams {
  blood_type?: string;
  amount?: number;
  city?: string;
  pet_type?: "cat" | "dog";
  due_date?: string;
}
