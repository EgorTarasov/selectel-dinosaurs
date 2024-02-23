import { Pet } from "./pets.model";

export interface Donation {
  id: number;
  amount: number;
  desctiption: string;
  date: string;
  pet: Pet;
}
