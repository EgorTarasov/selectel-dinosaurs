import api from "api/utils/api";
import { Bank, FetchBanksParams } from "../models";

export namespace BanksEndpoint {
  export const fetchBanks = async (params: FetchBanksParams) => {
    return api.get<Bank[]>("/api/banks/", { params });
  };
}
