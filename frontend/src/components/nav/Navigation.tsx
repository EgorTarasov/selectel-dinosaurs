import { AuthService } from "@/stores/auth.service";
import { Link } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import Logo from "@/assets/logo.svg";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { HamburgerMenu } from "./Hamburger";

export const NavLink = ({
  to,
  children,
  mobile,
  onClick
}: {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link to={to} onClick={onClick}>
      {({ isActive }) => (
        <div
          className={cn("px-2 lg:px-5", mobile && "text-xl py-4")}
          style={{ textShadow: isActive ? "0px 0px 1px black" : undefined }}>
          {children}
        </div>
      )}
    </Link>
  );
};

export const Navigation = observer(() => {
  return (
    <header className="bg-white flex sticky top-0 z-20">
      <div className="section flex items-center py-4 w-full">
        <Link to="/" className="mr-4">
          <Logo />
        </Link>
        <HamburgerMenu />
        <div className="hidden md:flex items-center w-full">
          <NavLink to="/">Поиск донора</NavLink>
          <NavLink to="/map">Карта банков</NavLink>
          <NavLink to="/leaderboard">Рейтинг</NavLink>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/profile">
              {AuthService.auth.state === "authenticated" && (
                <div className="w-10 h-10 border rounded-full">
                  {AuthService.auth.user.avatar ? (
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={AuthService.auth.user.avatar}
                      alt="Ваш аватар"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  )}
                </div>
              )}
            </Link>
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
      </div>
    </header>
  );
});
