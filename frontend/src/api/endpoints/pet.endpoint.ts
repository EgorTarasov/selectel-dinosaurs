import api from "api/utils/api";
import { CreatePetParams, Pet, UpdatePetParams } from "../models";

export namespace PetsEndpoint {
  export const fetchOwnPets = async () => {
    return api.get<Pet[]>("/api/pets/pets/my");
  };

  export const fetchPet = async (id: number) => {
    return api.get<Pet>(`/api/pets/pets/${id}`);
  };

  export const fetchPets = async () => {
    return api.get<Pet[]>("/api/pets/pets");
  };

  export const createPet = async (params: CreatePetParams) => {
    return api.post<Pet>("/api/pets/pets", params);
  };

  export const updatePet = async ({ id, ...params }: UpdatePetParams) => {
    return api.put<Pet>(`/api/pets/pets/${id}`, params);
  };

  export const postPetPhoto = async (photo: File) => {
    const formData = new FormData();
    formData.append("photo", photo);

    return api.put<string>("/api/pets/pets/photo", formData);
  };
}
