import { AuthService } from "@/stores/auth.service";
import { Link } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

export const Navigation = observer(() => {
  return (
    <>
      <div className="p-2 flex gap-2">
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
