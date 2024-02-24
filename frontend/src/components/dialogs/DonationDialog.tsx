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

type Props = {
  callback: (value: number) => void;
  title: string;
  description: string;
  confirmLabel: string;
  initialValue?: number;
};

const DonationDialog = ({ callback, title, description, confirmLabel, initialValue }: Props) => {
  const [value, setValue] = useState(0);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Количество крови, мл
          </Label>
          <Input
            value={value}
            defaultValue={initialValue}
            onChange={(e) => setValue(+e.target.value)}
            id="name"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"secondary"} onClick={() => callback(value)} type="submit">
            {confirmLabel}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DonationDialog;
