import { Navigation } from "@/components/nav/Navigation";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navigation />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  pendingComponent: () => <div>Загружаем!</div>
});
