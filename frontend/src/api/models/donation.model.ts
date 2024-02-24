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
