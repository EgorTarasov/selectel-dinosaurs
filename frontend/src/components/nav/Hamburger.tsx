import { observer } from "mobx-react-lite";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../ui/drawer";
import { Button, buttonVariants } from "../ui/button";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavLink } from "./Navigation";
import { useState } from "react";
import { AuthService } from "@/stores/auth.service";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const HamburgerMenu = observer(() => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="flex md:hidden ml-auto">
        <Button variant="secondary">
          <HamburgerMenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-[10000]">
        <DrawerHeader className="flex justify-between">
          <DrawerTitle>Меню</DrawerTitle>
          <DrawerClose>
            <Cross1Icon className="w-6 h-6" />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-3 p-4 min-h-[70vh]">
          <NavLink onClick={() => setOpen(false)} mobile to="/">
            Поиск донора
          </NavLink>
          <NavLink onClick={() => setOpen(false)} mobile to="/map">
            Карта банков
          </NavLink>
          <NavLink onClick={() => setOpen(false)} mobile to="/leaderboard">
            Рейтинг
          </NavLink>
          <NavLink onClick={() => setOpen(false)} mobile to="/profile">
            Профиль
          </NavLink>
          {AuthService.auth.state !== "loading" && (
            <Link
              to="/login"
              className={cn(buttonVariants({ size: "lg" }), "mt-auto mb-6")}
              onClick={() => {
                if (AuthService.auth.state === "authenticated") {
                  AuthService.logout();
                }
                setOpen(false);
              }}
              search={{ redirect: window.location.href }}>
              {AuthService.auth.state === "authenticated" ? "Выйти из аккаунта" : "Войти в аккаунт"}
            </Link>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
});
