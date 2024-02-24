import { VkLoginButton } from "@/components/buttons/VkLoginButton";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { cn } from "@/lib/utils";
import { LoginStore } from "@/stores/login.store";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Login = observer(() => {
  const { redirect } = Route.useSearch();
  const [vm] = useState(() => new LoginStore(redirect));

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col rounded-lg bg-white w-96 p-6">
        <Tabs
          tabs={["login", "register"]}
          activeTab={vm.tab}
          renderTab={(tab) => (tab === "login" ? "Вход" : "Регистрация")}
          onTabChange={(tab) => (vm.tab = tab)}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            vm.onSubmit();
          }}
          className="flex flex-col py-5">
          <fieldset className="flex flex-col gap-1.5">
            <Label className={cn(vm.isErrored && "text-destructive")}>Почта</Label>
            <Input
              disabled={vm.isLoading}
              type="email"
              placeholder="test@test.com"
              value={vm.email}
              onChange={(e) => (vm.email = e.target.value)}
            />
          </fieldset>
          <fieldset className="gap-1.5 flex flex-col mt-3 relative">
            <Label className={cn(vm.isErrored && "text-destructive")}>Пароль</Label>
            <Input
              disabled={vm.isLoading}
              type="password"
              placeholder="Test123456"
              value={vm.password}
              onChange={(e) => (vm.password = e.target.value)}
            />
            {vm.tab === "login" && (
              <button
                type="button"
                className="absolute right-2 bottom-1.5 text-slate-600 hover:underline">
                Забыли?
              </button>
            )}
          </fieldset>
          {vm.isErrored && (
            <Text.UiMedium className="text-destructive mt-2 text-center">
              {vm.tab === "login"
                ? "Неверный логин или пароль"
                : "Пользователь с таким email уже зарегистрирован"}
            </Text.UiMedium>
          )}
          <Button type="submit" className="mt-5 mb-3" disabled={vm.isLoading}>
            {vm.isLoading ? "Загрузка..." : vm.tab === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
          <VkLoginButton />
        </form>
      </div>
    </div>
  );
});

interface LoginSearch {
  redirect: string;
}

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: search.redirect ? String(search.redirect) : "/"
    };
  }
});
