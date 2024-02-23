import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import { AuthService } from "@/stores/auth.service";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const Index = observer(() => {
  return (
    <div className="p-2">
      {AuthService.auth.state}
      <h1>all good</h1>
    </div>
  );
});

export const Route = createFileRoute("/")({
  component: () => (
    <PrivateRoute>
      <Index />
    </PrivateRoute>
  )
});
