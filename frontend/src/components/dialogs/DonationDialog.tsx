import { useState } from "react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

type Props = {
  callback: (value: {
    amount: number;
    date: Date | undefined;
    address: string;
    msg: string;
  }) => void;
  title: string;
  description: string;
  confirmLabel: string;
  initialValue?: number;
};

const DonationDialog = ({ callback, title, description, confirmLabel, initialValue }: Props) => {
  const [amount, setAmount] = useState(0);
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined);
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid flex-auto items-center gap-1.5">
          <Label htmlFor="name">Количество крови, мл</Label>
          <Input
            value={amount?.toString() ?? ""}
            onChange={(e) => setAmount(+e.target.value.replace(/[^0-9]/g, ""))}
            id="name"
          />
        </div>

        <div className="grid flex-auto items-center gap-1.5">
          <Label htmlFor="bloodVolume">Дата окончания поиска</Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !expirationDate && "text-muted-foreground"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {expirationDate ? format(expirationDate, "PPP") : <span>Выберите дату</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={expirationDate}
                onSelect={(date) => setExpirationDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid flex-auto items-center gap-1.5">
          <Label htmlFor="address">Адрес</Label>
          <Input
            onChange={(e) => setAddress(e.target.value)}
            type="address"
            value={address}
            id="address"
            placeholder="Адрес"
          />
        </div>

        <div className="grid flex-auto items-center gap-1.5">
          <Label htmlFor="msg">Сообщение</Label>
          <Input
            onChange={(e) => setMsg(e.target.value)}
            type="msg"
            value={msg}
            id="msg"
            placeholder="Адрес"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant={"secondary"}
            onClick={() => callback({ address, amount, date: expirationDate, msg })}
            type="submit">
            {confirmLabel}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DonationDialog;
