import { AuthEndpoint } from "@/api/endpoints/auth.endpoint";
import { UserEndpoint } from "@/api/endpoints/user.endpoint";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index
});

function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const res = await AuthEndpoint.login(username, password);
    console.log(res);
  };

  useEffect(() => {
    const checkUser = async () => {
      console.log(await UserEndpoint.current());
    };

    checkUser();
  }, []);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleAuth}>Login</button>
    </div>
  );
}
