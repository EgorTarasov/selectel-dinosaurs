export namespace BankDonationDto {
  export interface Template {
    date: Date;
    time: string;
    animal_type: "dog" | "cat";
    blood_type: string;
    count: number;
    bank: number;
  }

  export interface Item {
    id: number;
    date: string;
    animal_type: "dog" | "cat";
    blood_type: string;
    count: number;
  }
}
