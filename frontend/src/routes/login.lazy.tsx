import { AuthService } from "@/stores/auth.service";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Login = observer(() => {
  const { redirect } = Route.useSearch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const success = await AuthService.login(username, password);

    if (success) {
      // redirect to the previous page
      window.location.href = redirect; // TODO: use the redirect search param
    }
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

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
