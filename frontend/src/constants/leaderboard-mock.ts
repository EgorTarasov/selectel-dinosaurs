import avatar1 from "@/assets/mock-avatars/1.png";
import avatar2 from "@/assets/mock-avatars/2.png";
import avatar3 from "@/assets/mock-avatars/3.png";
import avatar4 from "@/assets/mock-avatars/4.png";
import avatar5 from "@/assets/mock-avatars/5.png";

export const mockUsers: {
  city: string;
  donationCount: string;
  name: string;
  avatarSrc: string;
}[] = [
  {
    city: "Санкт-петербург",
    donationCount: "24 донации",
    name: "Максим петров",
    avatarSrc: avatar1
  },
  {
    city: "Москва",
    donationCount: "18 донаций",
    name: "Александр Иванов",
    avatarSrc: avatar2
  },
  {
    city: "Санкт-петербург",
    donationCount: "14 донаций",
    name: "Мария Смирнова",
    avatarSrc: avatar3
  },
  {
    city: "Москва",
    donationCount: "10 донаций",
    name: "Александра Петрова",
    avatarSrc: avatar4
  },
  {
    city: "Санкт-петербург",
    donationCount: "8 донаций",
    name: "Алексей Иванов",
    avatarSrc: avatar5
  }
];
