import { AuthService } from "@/stores/auth.service";
import { Link } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import Logo from "@/assets/logo.svg";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link to={to}>
      {({ isActive }) => <div className={cn("px-5", isActive && "font-semibold")}>{children}</div>}
    </Link>
  );
};

export const Navigation = observer(() => {
  return (
    <header className="bg-white flex">
      <div className="section flex items-center py-4 w-full">
        <Link to="/" className="mr-4">
          <Logo />
        </Link>
        <NavLink to="/">Поиск донора для питомца </NavLink>
        <NavLink to="/playground">Где питомцу сдать кровь?</NavLink>
        <div className="ml-auto">
          {AuthService.auth.state === "authenticated" && (
            <Button onClick={() => AuthService.logout()}>Выйти</Button>
          )}
          {AuthService.auth.state === "anonymous" && (
            <Link
              to="/login"
              search={{ redirect: window.location.href }}
              className={buttonVariants()}>
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});
