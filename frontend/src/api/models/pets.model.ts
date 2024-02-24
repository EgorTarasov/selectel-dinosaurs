import { Donation } from "./donation.model";
import { UserDto } from "./user.model";

export interface Pet {
  id: number;
  type: string;
  breed: string;
  avatar: string;
  name: string;
  bloodType: string | null;
  age: number;
  weight: number;
  able_to_donate: boolean;
  owner: UserDto.Item;
  donations: Donation[];
  requests: unknown;
  vaccines: Vaccine[];
  cooldown_donation_days: number;
}

export interface CreatePetParams {
  type: string;
  breed: string;
  avatar: string;
  name: string;
  bloodType: string | null;
  age: number;
  weight: number;
  able_to_donate: boolean;
  vaccines: Vaccine[];
}

export interface Vaccine {
  name: string;
  date: string;
}

export interface UpdatePetParams {
  id: number;
  type: string;
  breed: string;
  avatar: string;
  name: string;
  bloodType: string | null;
  age: number;
  weight: number;
  able_to_donate: boolean;
  vaccines: Vaccine[];
}
