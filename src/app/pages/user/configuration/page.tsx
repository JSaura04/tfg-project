"use client";

import { FooterMain } from "@/components/footer/FooterMain";
import { HeaderNav } from "@/components/header/components/HeaderNav";
import { db } from "@/configs/auth/firebase_config";
import { getUserFromCookie, UserCookieData } from "@/configs/auth/getCookies";
import bcrypt from "bcryptjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function setUserCookie(data: UserCookieData) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  document.cookie = `user=${encodeURIComponent(
    JSON.stringify(data)
  )}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

export default function UserSettingsPage() {
  const [user, setUser] = useState<UserCookieData | null>(null);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = getUserFromCookie();
      if (!userData) {
        setLoading(false);
        return;
      }

      setUser(userData);
      setNombre(userData.nombre);

      try {
        const docRef = doc(db, "users", userData.id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.profileImageBase64) {
            setProfileImage(data.profileImageBase64);
          }
        }
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const showAlert = async (success: boolean, message: string) => {
    await Swal.fire({
      icon: success ? "success" : "error",
      title: success ? "¡Éxito!" : "Error",
      text: message,
      confirmButtonText: "Aceptar",
    });

    if (success) {
      location.reload(); // Recarga la página tras éxito
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const userRef = doc(db, "users", user.id);

      const updateData: any = { nombre };

      if (password.trim()) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        updateData.password = hashedPassword;
      }

      await updateDoc(userRef, updateData);

      // Actualizar cookie y estado local con el nuevo nombre
      const updatedUser = { ...user, nombre };
      setUserCookie(updatedUser);
      setUser(updatedUser);

      await showAlert(true, "Configuración actualizada con éxito.");
      setPassword(""); // Limpia campo contraseña después de guardar
    } catch (error: any) {
      console.error("Error al guardar:", error);
      await showAlert(
        false,
        `Hubo un error al guardar los cambios: ${error.message || error}`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <HeaderNav />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-600 text-lg font-semibold">
            Cargando configuración...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 flex flex-col">
      <HeaderNav />

      <main className="flex-grow pt-20 max-w-2xl mx-auto px-6">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Configuración de Usuario
          </h1>
          <p className="text-gray-500 mt-2">Edita tu perfil y contraseña</p>
        </section>

        <section className="bg-white shadow-md rounded-2xl p-8 space-y-6">
          {/* Foto y nombre */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md bg-yellow-200 flex items-center justify-center text-yellow-600 font-bold text-xl">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                "Sin foto"
              )}
            </div>
            <div>
              <p className="text-xl font-semibold">{nombre}</p>
              <p className="text-sm text-gray-500">
                Editar tus datos personales
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dejar en blanco para mantener la actual"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => window.history.back()}
              type="button"
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              Volver
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </section>
      </main>

      <FooterMain />
    </div>
  );
}
