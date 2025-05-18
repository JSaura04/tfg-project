"use client";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { HeaderMain } from "@/components/header";

import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderMain />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: "32px 28px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 28, color: "#222" }}>
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </h2>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              width: "100%",
              padding: "10px 0",
              background: "transparent",
              color: "#2563eb",
              border: "none",
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
