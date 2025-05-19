"use client";

import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    // Lógica de autenticación aquí
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[#e9d79a] p-8 shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Iniciar Sesión
      </h2>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-300 p-3 mb-4 rounded-md">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-1"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
