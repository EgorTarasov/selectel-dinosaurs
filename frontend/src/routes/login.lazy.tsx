import { AuthService } from "@/stores/auth.service";
import { createFileRoute } from "@tanstack/react-router";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";

class LoginStore {
  username = "";
  password = "";
  constructor() {
    makeAutoObservable(this);
  }
}

const Login = observer(() => {
  const { redirect } = Route.useSearch();
  const [vm] = useState(() => new LoginStore());

  const handleAuth = async () => {
    const success = await AuthService.login(vm.username, vm.password);

    if (success) {
      window.location.href = redirect ?? "/";
    }
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <input type="text" value={vm.username} onChange={(e) => (vm.username = e.target.value)} />
      <input type="password" value={vm.password} onChange={(e) => (vm.password = e.target.value)} />

      <button onClick={handleAuth}>Login</button>
    </div>
  );
});

interface LoginSearch {
  redirect: string;
}

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: search.redirect ? String(search.redirect) : "/"
    };
  }
});
