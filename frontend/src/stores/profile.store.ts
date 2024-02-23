import { UserEndpoint } from "@/api/endpoints/user.endpoint";
import { UserDto } from "@/api/models/user.model";
import { makeAutoObservable } from "mobx";

export class ProfileStore {
  tab: "settings" | "pets" = "settings";
  isEditing = false;
  item:
    | {
        loading: false;
        data: UserDto.Item;
      }
    | {
        loading: true;
        data: null;
      } = {
    loading: true,
    data: null
  };

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  async init() {
    this.item = {
      loading: false,
      data: await UserEndpoint.current()
    };
    this.item.data!.available_time = [
      { start: "10:00", end: "12:00" },
      { start: "13:00", end: "15:00" }
    ];
  }

  tempImage: string | null = null;
  async onImageUpload(file: File) {
    if (this.item.loading) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        this.item.data!.avatar = result;
        console.log(this.item.data!.avatar);
      }
    };
    reader.readAsDataURL(file);
  }

  async save() {}
}
