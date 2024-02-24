export interface Donation {
  id: number;
  amount: number;
  date: string;
  pet: {
    id: number;
    name: string;
    weight: number;
    age: number;
    type: string;
    avatar: string;
    bloodType: string;
  };
  owner: {
    vkid: number;
    contactGroup: {
      hidden: boolean;
      phone: string;
      email: string;
    };
    wishes: string;
  };
}

export interface SocialDonation {
  vkid: number;
  link: string;
  text: string;
  summary: string;
  images: string[];
  date: string;
  id: number;
  uploaded_by: number;
  uploaded_at: string;
}

export interface FetchDonationsParams {
  blood_type?: string;
  amount?: number;
  city?: string;
  pet_type?: "cat" | "dog";
  due_date?: string;
}

export interface CreateDonationParams {
  amount: number;
  petId: number;
  date: string;
  msg: string;
  address: string;
}

export interface CreateRequestParams {
  amount: number;
  petId: number;
  due_date: string;
  msg: string;
  address: string;
}

export interface BloodRequest {
  id: number;
  amount: number;
  due_date: string;
  date: string;
  msg: string;
  address: string;
  pet: {
    id: number;
    type: string;
    breed: string;
    avatar: string;
    name: string;
    age: number;
    weight: number;
    able_to_donate: boolean;
    donations: unknown[];
    requests: unknown[];
    vaccines: unknown[];
    cooldown_donation_days: number;
    bloodType: string;
  };
}

export interface DonationRequest {
  id: number;
  amount: number;
  date: string;
  msg: string;
  address: string;
  pet: {
    id: number;
    type: string;
    breed: string;
    avatar: string;
    name: string;
    age: number;
    weight: number;
    able_to_donate: boolean;
    donations: unknown[];
    requests: unknown[];
    vaccines: unknown[];
    cooldown_donation_days: number;
    bloodType: string;
  };
}
