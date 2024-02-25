import { Text } from "@/components/typography/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { AuthService } from "@/stores/auth.service";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { FormEvent, useRef, useState } from "react";

const ResetPassword = observer(() => {
  const search = Route.useSearch();
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(search.token === null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(form.current!);
    const password = formData.get("new-password") as string;
    const passwordConfirm = formData.get("password-confirm") as string;

    if (!password) {
      setLoading(false);
      setError("Введите пароль");
      return;
    }

    if (password !== passwordConfirm) {
      setLoading(false);
      setError("Пароли не совпадают");
      return;
    }

    AuthService.updatePassword(search.token!, password).then((res) => {
      if (res) {
        setSuccess(true);
      } else {
        setError("Не удалось обновить пароль");
      }
      setLoading(false);
    });
  };

  return (
    <div className="section flex flex-col h-96 justify-center items-center">
      <Toaster />
      {success && <Navigate to="/profile" />}
      <form
        ref={form}
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 w-80 p-5 bg-white rounded-lg">
        <div className="block">
          <Text.H4>Восстановление пароля</Text.H4>
          <Text.Subtle className="text-slate-500">
            Введите новый пароль для восстановления доступа
          </Text.Subtle>
        </div>
        <Input
          className="mt-2"
          disabled={loading}
          type="password"
          id="new-password"
          name="new-password"
          placeholder="Новый пароль"
        />
        <Input
          disabled={loading}
          type="password"
          id="password-confirm"
          name="password-confirm"
          placeholder="Подтвердите пароль"
        />
        {error && <Text.Error className="mt-1">{error}</Text.Error>}
        <Button className="ml-auto mt-2" disabled={loading}>
          Обновить пароль
        </Button>
      </form>
    </div>
  );
});

interface Search {
  token: string | null;
}

export const Route = createFileRoute("/reset-password")({
  component: () => <ResetPassword />,
  validateSearch: (search: Record<string, unknown>): Search => {
    return { token: (search.token as string | null) ?? null };
  }
});
