import { Donation } from "./donation.model";

export interface Pet {
  id: number;
  type: string;
  breed: string;
  avatar: string;
  name: string;
  age: number;
  weight: number;
  able_to_donate: boolean;
  owner: unknown; // TODO: Добавить ДТО юзера
  donations: Donation[];
  requests: unknown;
  vaccines: unknown;
  cooldown_donation_days: number;
}
