import { AuthService } from "@/stores/auth.service";
import { Link } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import Logo from "@/assets/logo.svg";

export const Navigation = observer(() => {
  return (
    <>
      <div className="section items-center gap-2">
        <Logo />
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/playground" className="[&.active]:font-bold">
          Playground
        </Link>
        <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>
        <div className="ml-auto">
          {AuthService.auth.state === "authenticated" && (
            <button onClick={() => AuthService.logout()}>разлогиниться</button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
});
