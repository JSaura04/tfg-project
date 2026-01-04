"use client";

import LoginForm from "@/components/auth/LoginForm";
import { HeaderMain } from "@/components/header";
import Link from "next/link";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeaderMain />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-fullp-8">
          <LoginForm />
          <div className="text-center mt-4">
            <Link
              href="../auth/register"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
