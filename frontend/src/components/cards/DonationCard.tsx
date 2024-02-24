import { Donation } from "@/api/models";
import { getDonationDeclension, getYearDeclension } from "@/api/utils/declesions";
import { Button } from "../ui/button";
import VkIcon from "@/assets/vk.svg";
import { BloodDonationsEndpoint } from "@/api/endpoints/donations.endpoint";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

const DonationCard = ({ id, pet: { avatar, name, age, weight, bloodType }, owner }: Donation) => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col p-4 rounded-md bg-white relative">
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
            {id} {getDonationDeclension(id)}
          </span>
        </div>
      </div>

      <div className="flex mt-2 gap-4">
        <div className="pet-weight">
          <span className="text-sm font-semibold">Вес:</span>
          <span className="text-sm"> {weight} кг</span>
        </div>

        {!owner.contactGroup.hidden && owner.contactGroup.phone && (
          <a
            href={`tel:${owner.contactGroup.phone}`}
            className="text-base flex gap-2 items-center underline-offset-4">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.1667 11.28V13.28C15.1674 13.4657 15.1294 13.6495 15.055 13.8196C14.9806 13.9897 14.8715 14.1424 14.7347 14.2679C14.5979 14.3934 14.4364 14.489 14.2605 14.5485C14.0846 14.608 13.8983 14.6301 13.7133 14.6133C11.6619 14.3904 9.69134 13.6894 7.96001 12.5667C6.34923 11.5431 4.98356 10.1775 3.96001 8.56668C2.83333 6.82748 2.13217 4.84734 1.91334 2.78668C1.89668 2.60233 1.91859 2.41652 1.97767 2.2411C2.03676 2.06567 2.13172 1.90447 2.25652 1.76776C2.38131 1.63105 2.53321 1.52182 2.70253 1.44703C2.87186 1.37224 3.0549 1.33352 3.24001 1.33335H5.24001C5.56354 1.33016 5.8772 1.44473 6.12251 1.6557C6.36783 1.86667 6.52806 2.15964 6.57334 2.48001C6.65775 3.12006 6.81431 3.7485 7.04001 4.35335C7.1297 4.59196 7.14911 4.85129 7.09594 5.1006C7.04277 5.34991 6.91925 5.57875 6.74001 5.76001L5.89334 6.60668C6.84238 8.27571 8.22431 9.65764 9.89334 10.6067L10.74 9.76001C10.9213 9.58077 11.1501 9.45725 11.3994 9.40408C11.6487 9.35091 11.9081 9.37032 12.1467 9.46001C12.7515 9.68571 13.38 9.84227 14.02 9.92668C14.3439 9.97237 14.6396 10.1355 14.851 10.385C15.0624 10.6345 15.1748 10.9531 15.1667 11.28Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>{owner.contactGroup.phone}</span>
          </a>
        )}
      </div>

      {!owner.contactGroup.hidden && owner.vkid && (
        <div className="mt-2">
          <a href={`vk.com/${owner.vkid}`} target="_blank" rel="noreferrer">
            <Button className="w-13 h-13" variant="outline">
              <VkIcon />
            </Button>
          </a>
        </div>
      )}

      <div className="donation-description">
        <span className="text-sm font-semibold">Пожелания владельца:</span>
        <span className="text-sm"> {owner.wishes}</span>
      </div>

      <div className="flex justify-end w-full flex-col h-full mt-3">
        <Button
          onClick={() => {
            BloodDonationsEndpoint.postBloodDonationResponse(id, 2)
              .then(() => {
                toast({
                  title: "Запрос отправлен",
                  description: "Донор свяжется с вами, если сможет помочь."
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
          className="w-full bottom-0 relative"
          variant="outline">
          Отправить запрос
        </Button>
      </div>

      <div className="absolute p-3 top-0 right-0 bg-red-500 rounded-tr-md rounded-bl-md text-white font-semibold">
        {bloodType}
      </div>
    </div>
  );
};

export default DonationCard;
