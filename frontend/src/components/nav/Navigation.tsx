import { AuthService } from "@/stores/auth.service";
import { Link } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import Logo from "@/assets/logo.svg";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link to={to}>
      {({ isActive }) => (
        <div
          className={cn("px-5")}
          style={{ textShadow: isActive ? "0px 0px 1px black" : undefined }}>
          {children}
        </div>
      )}
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
        <NavLink to="/map">Где питомцу сдать кровь?</NavLink>
        <div className="ml-auto">
          {AuthService.auth.state !== "loading" && (
            <Link
              to="/login"
              className={buttonVariants()}
              onClick={() => AuthService.auth.state === "authenticated" && AuthService.logout()}
              search={{ redirect: window.location.href }}>
              {AuthService.auth.state === "authenticated" ? "Выйти" : "Войти"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});
