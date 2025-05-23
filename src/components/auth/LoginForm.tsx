"use client";

import bcrypt from "bcryptjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase_config";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    setLoading(true);

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("correo", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Usuario no encontrado.");
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      const isPasswordValid = bcrypt.compareSync(password, userData.password);

      if (!isPasswordValid) {
        throw new Error("Contraseña incorrecta.");
      }

      // Guardar cookie con datos del usuario (7 días)
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify({
          id: userDoc.id,
          nombre: userData.nombre,
          correo: userData.correo,
        })
      )}; path=/; max-age=${60 * 60 * 24 * 7}`;

      Swal.fire({
        icon: "success",
        title: `Bienvenido, ${userData.nombre}!`,
        text: "Has iniciado sesión correctamente.",
      });

      setEmail("");
      setPassword("");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: err.message || "Ha ocurrido un error.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[#e9d79a] p-8 shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Iniciar Sesión
      </h2>

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
        disabled={loading}
        className={`w-full py-3 text-white font-medium rounded-md transition-colors ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Entrando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
