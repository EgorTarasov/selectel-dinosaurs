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
