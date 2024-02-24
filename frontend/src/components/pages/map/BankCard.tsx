import { Bank } from "@/api/models";
import { Text } from "@/components/typography/Text";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import PhoneIcon from "@/assets/phone.svg";

export const BankCard: FC<{ item: Bank; onClick: () => void }> = observer(({ item, onClick }) => {
  return (
    <div
      className="flex flex-col gap-4 hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition-all duration-300"
      onClick={onClick}>
      <Text.H4>{item.name}</Text.H4>
      <div className="flex flex-col gap-3">
        <Text.UI>{item.address}</Text.UI>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <div className="w-4 h-4">
              <PhoneIcon />
            </div>
            <Text.Small>{item.phone}</Text.Small>
          </span>
          <a href={item.link} className="text-blue-400 underline hover:no-underline">
            Перейти на сайт банка
          </a>
        </div>
      </div>
    </div>
  );
});
