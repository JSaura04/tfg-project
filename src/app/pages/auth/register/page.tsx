"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import { HeaderMain } from "@/components/header";
import Link from "next/link";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeaderMain />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full p-8">
          <RegisterForm />
          <div className="text-center mt-4">
            <Link
              href="../auth/login"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
