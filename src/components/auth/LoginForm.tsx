"use client";

import bcrypt from "bcryptjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../configs/auth/firebase_config";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      const userCookie = {
        id: userDoc.id,
        nombre: userData.nombre,
        correo: userData.correo,
      };

      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(userCookie)
      )}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 días

      Swal.fire({
        icon: "success",
        title: `Bienvenido, ${userData.nombre}!`,
        text: "Has iniciado sesión correctamente.",
      }).then(() => {
        router.push("/pages/main");
      });

      // Limpiar campos
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
      className="max-w-md mx-auto bg-white p-8 shadow-xl rounded-2xl border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Bienvenido
      </h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Ingresa tus credenciales para continuar
      </p>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-600 mb-2"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-600 mb-2"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
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
        {loading ? "Entrando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
