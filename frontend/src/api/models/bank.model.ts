export interface Bank {
  id: number;
  name: string;
  address: string;
  city: string;
  pricePerMil: number;
  amountOfBlood: number;
  phone: string;
  link: string;
}

export interface FetchBanksParams {
  blood_type?: string;
  amount?: number;
  city?: string;
  pet_type?: "cat" | "dog";
  due_date?: string;
}
