import api from "api/utils/api";
import {
  BloodRequest,
  CreateDonationParams,
  CreateRequestParams,
  Donation,
  FetchDonationsParams,
  SocialDonation
} from "../models";

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
      ...params
    });
  };

  export const postRequest = async ({ petId, ...params }: CreateRequestParams) => {
    return api.post<{}>(`/api/blood-requests/pet/${petId}`, {
      ...params
    });
  };

  export const fetchRequests = async (params: FetchDonationsParams) => {
    return api.get<BloodRequest[]>("/api/blood-requests/", { params });
  };

  export const deleteBloodDonation = async (id: number) => {
    return api.delete<{}>(`/api/blood-donations/${id}`);
  };

  export const deleteBloodRequest = async (id: number) => {
    return api.delete<{}>(`/api/blood-requests/${id}`);
  };
}
