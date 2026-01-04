"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../../configs/auth/firebase_config";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(username, email, password);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: response.message,
        });

        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: err.message || "Ha ocurrido un error desconocido.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-lg mx-auto bg-white p-8 shadow-xl rounded-2xl border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Crea tu cuenta
      </h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Regístrate para comenzar a usar PicIt
      </p>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Nombre
        </label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          autoComplete="username"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
        }`}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;
