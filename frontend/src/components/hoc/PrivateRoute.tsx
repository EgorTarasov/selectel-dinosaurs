import { AuthService } from "@/stores/auth.service";
import { Navigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

export const PrivateRoute = observer(({ children }: { children: ReactNode }) => {
  if (AuthService.auth.state !== "authenticated") {
    return (
      <Navigate
        to="/login"
        search={{
          redirect: window.location.pathname
        }}
      />
    );
  }

  return <>{children}</>;
});
