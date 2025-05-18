"use client";

import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registerName, setRegisterName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password || (!isLogin && !registerName)) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    // Aquí iría la lógica de login o registro
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: 6,
              fontWeight: 500,
              color: "#333",
            }}
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              fontSize: 16,
            }}
            required={!isLogin}
          />
        </div>
      )}
      <div style={{ marginBottom: 20 }}>
        <label
          htmlFor="email"
          style={{
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
            color: "#333",
          }}
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            fontSize: 16,
          }}
          required
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label
          htmlFor="password"
          style={{
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
            color: "#333",
          }}
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            fontSize: 16,
          }}
          required
        />
      </div>
      {error && (
        <div
          style={{
            color: "#e53e3e",
            background: "#fff5f5",
            border: "1px solid #fed7d7",
            borderRadius: 6,
            padding: "8px 12px",
            marginBottom: 18,
          }}
        >
          {error}
        </div>
      )}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px 0",
          background: "#2563eb",
          color: "#fff",
          borderRadius: 6,
        }}
      >
        {isLogin ? "Entrar" : "Registrarse"}
      </button>
      <button
        type="button"
        onClick={() => {
          setIsLogin(!isLogin);
          setError("");
        }}
        style={{
          width: "100%",
          padding: "10px 0",
          background: "transparent",
          color: "#2563eb",
          borderRadius: 6,
          textDecoration: "underline",
        }}
      >
        {isLogin
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
