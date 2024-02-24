import { Navigation } from "@/components/nav/Navigation";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navigation />
      <Outlet />
    </>
  ),
  pendingComponent: () => <div>Загружаем!</div>
});
