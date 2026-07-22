"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export const GoogleLoginButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleGoogleLogin = async () => {
    setIsPending(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    setIsPending(false);
  };

  return (
    <Button
      className="w-full cursor-pointer bg-btn-primary hover:bg-transparent text-btn-text hover:border-border-color"
      onClick={handleGoogleLogin}
      disabled={isPending}
    >
      {/* Google Icon */}
      <FaGoogle />
      {isPending ? "Redirecting..." : "Continue with Google"}
    </Button>
  );
};
