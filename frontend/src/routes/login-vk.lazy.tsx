import LoadingEllipsis from "@/components/ui/loaders/LoadingEllipsis";
import { AuthService } from "@/stores/auth.service";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import VkLogo from "@/assets/vk.svg";
import { Text } from "@/components/typography/Text";
import { Toaster } from "@/components/ui/toaster";

const Login = () => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = JSON.parse(params.get("payload")!);

    AuthService.loginViaVk(payload).then(() => {
      setSuccess(true);
    });
  }, []);

  return (
    <div className="section flex flex-col h-96 justify-center items-center">
      <Toaster />
      {success && <Navigate to="/profile" />}
      <div className="w-28 h-28">
        <VkLogo />
      </div>
      <Text.H3>Происходит авторизация через Вконтакте</Text.H3>
      <LoadingEllipsis />
    </div>
  );
};

export const Route = createLazyFileRoute("/login-vk")({
  component: Login
});
