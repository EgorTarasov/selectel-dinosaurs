import { DonationRequest } from "@/api/models";
import { getYearDeclension } from "@/api/utils/declesions";
import { Button } from "../ui/button";
import { BloodDonationsEndpoint } from "@/api/endpoints/donations.endpoint";
import { useToast } from "../ui/use-toast";

const DonationRequestCard = ({
  id,
  amount,
  pet: { avatar, name, age, bloodType },
  msg,
  address
}: DonationRequest) => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col p-4 rounded-md bg-white relative">
      <div className="flex">
        <h3 className="text-primary mb-5 font-semibold">Требуется донор!</h3>
      </div>

      <div className="flex gap-4">
        <div className="pet-image">
          <img className="rounded-full h-12 w-12 object-cover" src={avatar} alt={name} />
        </div>

        <div className="card-content flex flex-col">
          <span className="card-title text-xl font-semibold">
            {name}, {age} {getYearDeclension(age)}
          </span>

          <span className="text-slate-500 text-sm flex gap-1 items-center">Заболевание: {msg}</span>
        </div>
      </div>

      <div className="flex mt-2 gap-4">
        <div className="pet-weight">
          <span className="text-sm font-semibold">Требуемый объем крови:</span>
          <span className="text-sm"> {amount} мл</span>
        </div>
      </div>

      <div className="donation-description">
        <span className="text-sm font-semibold">Адрес клиники:</span>
        <span className="text-sm">{address}</span>
      </div>

      <div className="flex justify-end w-full flex-col h-full mt-3">
        <div>
          <Button
            onClick={() => {
              BloodDonationsEndpoint.deleteBloodDonation(id)
                .then(() => {
                  toast({
                    title: "Запрос отклонен",
                    description: ""
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
              BloodDonationsEndpoint.deleteBloodDonation(id)
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

export default DonationRequestCard;
