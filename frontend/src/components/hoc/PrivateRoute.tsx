import { AuthService } from "@/stores/auth.service";
import { Navigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import LoadingEllipsis from "../ui/loaders/LoadingEllipsis";

export const PrivateRoute = observer(({ children }: { children: ReactNode }) => {
  if (AuthService.auth.state === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingEllipsis />
      </div>
    );
  }

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
