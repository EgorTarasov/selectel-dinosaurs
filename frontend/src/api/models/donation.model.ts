import { Pet } from "./pets.model";

export interface Donation {
  id: number;
  amount: number;
  desctiption: string;
  date: string;
  pet: Pet;
}

export interface SocialDonation {
  id: number;
  city: string;
  name: string;
  link: string;
  phone?: string;
  blood?: string;
  pet?: string;
}

export interface FetchDonationsParams {
  blood_type?: string;
  amount?: number;
  city?: string;
  pet_type?: "cat" | "dog";
  due_date?: string;
}
