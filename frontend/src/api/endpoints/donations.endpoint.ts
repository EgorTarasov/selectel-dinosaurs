import api from "api/utils/api";
import { Donation, FetchDonationsParams } from "../models";

export namespace BloodDonationsEndpoint {
  export const fetchBloodDonations = async (params: FetchDonationsParams) => {
    return api.get<Donation[]>("/api/blood-donations/", { params });
  };
}
