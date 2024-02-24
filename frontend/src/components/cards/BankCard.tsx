import { Bank } from "@/api/models";
import { Button } from "../ui/button";

const BankCard = ({ address, link, name, phone, pricePerMil }: Bank) => {
  return (
    <>
      <div className="flex flex-col p-4 rounded-md bg-white">
        <h2 className="text-xl font-semibold">{name}</h2>

        <p className="text-base font-regular mt-2">{address}</p>

        <div className="flex mt-2 gap-4">
          <a href={`tel:${phone}`} className="text-base flex gap-2 items-center underline-offset-4">
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

            <span>{phone}</span>
          </a>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline underline-offset-4">
            Перейти на сайт банка
          </a>
        </div>

        <hr className="border-t border-gray-200 mt-3 mb-3" />

        <p className="text-sm font-semibold mb-3">Стоимость {pricePerMil} руб.</p>

        <div className="flex justify-end w-full flex-col h-full">
          <a href={link} target="_blank" rel="noreferrer">
            <Button className="w-full bottom-0 relative" variant="outline">
              Забронировать
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BankCard;
