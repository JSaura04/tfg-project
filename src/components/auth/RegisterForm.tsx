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
      className="max-w-md mx-auto bg-[#e9d79a] p-8 shadow-lg rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          autoComplete="username"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Correo</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border bg-white border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          autoComplete="email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border bg-white border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 text-white font-medium rounded-md transition-colors ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;
