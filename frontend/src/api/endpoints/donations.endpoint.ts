import api from "api/utils/api";
import { CreateDonationParams, Donation, FetchDonationsParams, SocialDonation } from "../models";

export namespace BloodDonationsEndpoint {
  export const fetchBloodDonations = async (params: FetchDonationsParams) => {
    return api.get<Donation[]>("/api/blood-donations/", { params });
  };

  export const postBloodDonationResponse = async (donationId: number, petId: number) => {
    return api.post<Donation>(`/api/blood-donations/${donationId}/pet/${petId}`, {
      msg: "string",
      amount: 0
    });
  };

  export const fetchSocialDonations = async (params: FetchDonationsParams) => {
    return api.get<SocialDonation[]>("/api/social/social", { params });
  };

  export const postDonation = async ({ petId, ...params }: CreateDonationParams) => {
    return api.post<{}>(`/api/blood-donations/pet/${petId}`, {
      ...params,
      date: new Date().toISOString().slice(0, -1)
    });
  };

  export const postRequest = async ({ petId, ...params }: CreateDonationParams) => {
    return api.post<{}>(`/api/blood-requests/pet/${petId}`, {
      ...params,
      due_date: new Date().toISOString().slice(0, -1)
    });
  };

  export const deleteBloodDonation = async (id: number) => {
    return api.delete<{}>(`/api/blood-donations/${id}`);
  };

  export const deleteBloodRequest = async (id: number) => {
    return api.delete<{}>(`/api/blood-requests/${id}`);
  };
}
