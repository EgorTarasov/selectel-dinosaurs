import { BankDonationDto } from "../models/bank-donation.model";
import api from "../utils/api";

export namespace BankDonationEndpoint {
  export const create = async (template: BankDonationDto.Template) => {
    const res = await api.post<BankDonationDto.Item>("/api/bank_donation", template);

    return res;
  };
}
