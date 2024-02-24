import { BankRequestDto } from "../models/bank-request.model";
import api from "../utils/api";

export namespace BankRequestEndpoint {
  export const create = async (template: BankRequestDto.Template) => {
    const res = await api.post<BankRequestDto.Item>("/api/bank_request", template);

    return res;
  };

  export const fetchBankRequests = async () => {
    const res = await api.get<BankRequestDto.Item[]>("/api/bank_request");

    return res;
  };
}
