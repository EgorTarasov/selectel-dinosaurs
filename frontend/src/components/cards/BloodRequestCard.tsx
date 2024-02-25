import { BloodRequest } from "@/api/models";
import { getDonationDeclension, getYearDeclension } from "@/api/utils/declesions";
import { Button } from "../ui/button";
import { BloodDonationsEndpoint } from "@/api/endpoints/donations.endpoint";
import { useToast } from "../ui/use-toast";

const BloodRequestCard = ({
  id,
  pet: { avatar, name, age, bloodType, weight },
  msg
}: BloodRequest) => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col p-4 rounded-md bg-white relative">
      <div className="flex">
        <h3 className="text-primary mb-5 font-semibold">Найден донор</h3>
      </div>

      <div className="flex gap-4">
        <div className="pet-image">
          <img className="rounded-full h-12 w-12 object-cover" src={avatar} alt={name} />
        </div>

        <div className="card-content flex flex-col">
          <span className="card-title text-xl font-semibold">
            {name}, {age} {getYearDeclension(age)}
          </span>

          <span className="text-slate-500 text-sm flex gap-1 items-center">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.49999 6H3.49999C3.05797 6 2.63404 5.82441 2.32148 5.51185C2.00892 5.19929 1.83333 4.77536 1.83333 4.33333C1.83333 3.89131 2.00892 3.46738 2.32148 3.15482C2.63404 2.84226 3.05797 2.66667 3.49999 2.66667H4.49999"
                stroke="#F73232"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 6H13.5C13.942 6 14.366 5.82441 14.6785 5.51185C14.9911 5.19929 15.1667 4.77536 15.1667 4.33333C15.1667 3.89131 14.9911 3.46738 14.6785 3.15482C14.366 2.84226 13.942 2.66667 13.5 2.66667H12.5"
                stroke="#F73232"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.16667 14.6667H13.8333"
                stroke="#F73232"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.16667 9.77333V11.3333C7.16667 11.7 6.85334 11.9867 6.52 12.14C5.73334 12.5 5.16667 13.4933 5.16667 14.6667"
                stroke="#F73232"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.83333 9.77333V11.3333C9.83333 11.7 10.1467 11.9867 10.48 12.14C11.2667 12.5 11.8333 13.4933 11.8333 14.6667"
                stroke="#F73232"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 1.33333H4.5V6C4.5 7.06086 4.92143 8.07828 5.67157 8.82843C6.42172 9.57857 7.43913 10 8.5 10C9.56087 10 10.5783 9.57857 11.3284 8.82843C12.0786 8.07828 12.5 7.06086 12.5 6V1.33333Z"
                stroke="#F73232"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {id % 10} {getDonationDeclension(id % 10)}
          </span>
        </div>
      </div>

      <div className="flex mt-2 gap-4">
        <div className="pet-weight">
          <span className="text-sm font-semibold">Вес:</span>
          <span className="text-sm"> {weight} кг</span>
        </div>
      </div>

      <div className="donation-description">
        <span className="text-sm font-semibold">Пожелания владельца:</span>
        <span className="text-sm">{msg}</span>
      </div>

      <div className="flex justify-end w-full flex-col h-full mt-3">
        <div>
          <Button
            onClick={() => {
              BloodDonationsEndpoint.deleteBloodRequest(id)
                .then(() => {
                  toast({
                    title: "Запрос отклонен",
                    description: "Помощь не требуется"
                  });
                })
                .catch(() => {
                  toast({
                    title: "Ошибка",
                    description: "Не удалось отклонить запрос",
                    variant: "destructive"
                  });
                });
            }}
            className="w-full bottom-0 relative"
            variant="outline">
            Не принимать запрос
          </Button>

          <Button
            onClick={() => {
              BloodDonationsEndpoint.deleteBloodRequest(id)
                .then(() => {
                  toast({
                    title: "Запрос принят",
                    description: "Отправим все детали на электронную почту"
                  });
                })
                .catch(() => {
                  toast({
                    title: "Ошибка",
                    description: "Не удалось отправить запрос",
                    variant: "destructive"
                  });
                });
            }}
            className="w-full bottom-0 relative mt-2"
            variant="outline">
            Принять запрос
          </Button>
        </div>
      </div>

      <div className="absolute p-3 top-0 right-0 bg-red-500 rounded-tr-md rounded-bl-md text-white font-semibold">
        {bloodType}
      </div>
    </div>
  );
};

export default BloodRequestCard;
