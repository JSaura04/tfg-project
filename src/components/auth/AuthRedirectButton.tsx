"use client";

import { Button } from "@/components/primitives";
import { useRouter } from "next/navigation";
import React from "react";

const AUTH_COOKIE_NAME = "user";

const AuthRedirectButton: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    const cookies = Object.fromEntries(
      document.cookie.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      })
    );

    const hasUserCookie = cookies[AUTH_COOKIE_NAME];

    if (hasUserCookie) {
      router.push("/pages/main");
    } else {
      router.push("./pages/auth/login");
    }
  };

  return (
    <Button
      className="bg-[#dbaf1e] px-8 py-3 text-xl font-semibold rounded shadow-lg hover:bg-yellow-500 transition-colors"
      onClick={handleRedirect}
    >
      Acceder
    </Button>
  );
};

export default AuthRedirectButton;
