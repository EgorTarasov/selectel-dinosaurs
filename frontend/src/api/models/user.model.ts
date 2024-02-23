export namespace UserDto {
  interface AvailableTime {
    start: string;
    end: string;
  }

  export interface Item {
    id: number;
    email: string;
    contact_group: {
      hidden: boolean;
      phone: string;
      email: string;
    };
    first_name: string;
    middle_name: string;
    last_name: string;
    city: null | string;
    vkid: null | string;
    wishes: string;
    available_weekends_only: boolean;
    available_time: AvailableTime[];
    avatar?: string;
  }

  export interface Update {}
}
