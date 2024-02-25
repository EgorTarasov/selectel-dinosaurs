import { observer } from "mobx-react-lite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { AuthEndpoint } from "@/api/endpoints/auth.endpoint";
import { toast } from "../ui/use-toast";

export const ForgotPassword = observer(() => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    AuthEndpoint.requestResetPassword(email)
      .then(() => {
        setLoading(false);
        setOpen(false);
        toast({
          description: "Письмо с инструкциями по восстановлению пароля отправлено на вашу почту",
          title: "Проверьте почту"
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Такой почты не существует",
          title: "Ошибка"
        });
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="absolute right-2 bottom-1.5 text-slate-600 hover:underline">
          Забыли?
        </button>
      </DialogTrigger>
      <DialogContent className="w-96" onSubmit={() => handleSubmit()}>
        <DialogHeader>Восстановление пароля</DialogHeader>
        <DialogDescription>Введите почту, которую вы указали при регистрации</DialogDescription>
        <Input
          placeholder="Почта"
          disabled={loading}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DialogFooter>
          <Button disabled={loading} onClick={() => handleSubmit()}>
            Отправить письмо
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
