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
        <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-7">
            Iniciar sesión
          </h2>
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
