"use client";

import { HeaderNav } from "@/components/header/components/HeaderNav";
import { db } from "@/configs/auth/firebase_config";
import { getUserFromCookie, UserCookieData } from "@/configs/auth/getCookies";
import { updateUserBannerImage } from "@/configs/user/setBannerPicture";
import { updateUserProfileImage } from "@/configs/user/setProfilePicture";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

type Section = "photos" | "favorites";

export default function UserProfilePage() {
  const [user, setUser] = useState<UserCookieData | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(
    null
  );
  const [bannerImageBase64, setBannerImageBase64] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("photos");
  const [updatingImage, setUpdatingImage] = useState(false);
  const [updatingBanner, setUpdatingBanner] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = getUserFromCookie();
      if (!userData) {
        setLoading(false);
        return;
      }

      setUser(userData);

      try {
        const userDocRef = doc(db, "users", userData.id);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.profileImageBase64)
            setProfileImageBase64(data.profileImageBase64);
          if (data.bannerImageBase64)
            setBannerImageBase64(data.bannerImageBase64);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject("Error al convertir archivo a base64");
      };
      reader.onerror = reject;
    });
  };

  const showAlert = async (success: boolean, message: string) => {
    await Swal.fire({
      icon: success ? "success" : "error",
      title: success ? "¡Éxito!" : "Error",
      text: message,
      confirmButtonText: "Aceptar",
    });

    if (success) {
      location.reload();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUpdatingImage(true);
      const base64 = await fileToBase64(file);
      const result = await updateUserProfileImage(user.id, base64);
      await showAlert(
        result.success,
        result.success
          ? "Imagen de perfil actualizada con éxito."
          : result.message
      );
    } catch {
      await showAlert(false, "Error al actualizar la imagen.");
    } finally {
      setUpdatingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUpdatingBanner(true);
      const base64 = await fileToBase64(file);
      const result = await updateUserBannerImage(user.id, base64);
      await showAlert(
        result.success,
        result.success ? "Banner actualizado con éxito." : result.message
      );
    } catch {
      await showAlert(false, "Error al actualizar el banner.");
    } finally {
      setUpdatingBanner(false);
      if (bannerInputRef.current) bannerInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <HeaderNav />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-600 text-lg font-semibold">
            Cargando perfil...
          </p>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <HeaderNav />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-600 text-lg font-semibold">
            No se encontró información del usuario.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 flex flex-col">
      <HeaderNav />

      {/* Banner */}
      <header className="relative h-56 md:h-72 shadow-md">
        <div
          className="absolute inset-0 cursor-pointer"
          title="Haz click para cambiar el banner"
          onClick={() => bannerInputRef.current?.click()}
        >
          {bannerImageBase64 ? (
            <img
              src={bannerImageBase64}
              alt="Banner de usuario"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-semibold text-lg opacity-0 hover:opacity-100 transition-opacity">
            {updatingBanner ? "Actualizando banner..." : "Cambiar banner"}
          </div>
        </div>

        {/* Foto de perfil */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4rem] w-40 h-40 border-8 border-white shadow-lg rounded-full overflow-hidden cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          title="Haz click para cambiar la foto"
        >
          {profileImageBase64 ? (
            <>
              <img
                src={profileImageBase64}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
                {updatingImage ? "Actualizando..." : "Cambiar foto"}
              </div>
            </>
          ) : (
            <div className="bg-yellow-200 w-full h-full flex items-center justify-center text-yellow-600 font-bold text-2xl relative">
              Sin foto
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
                {updatingImage ? "Actualizando..." : "Cambiar foto"}
              </div>
            </div>
          )}
        </div>

        {/* Inputs ocultos */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={updatingImage}
        />
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleBannerChange}
          disabled={updatingBanner}
        />
      </header>

      {/* Main */}
      <main className="flex-grow pt-20 max-w-6xl mx-auto px-6">
        <section className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            {user.nombre}
          </h1>
        </section>

        {/* Tabs */}
        <nav className="mb-10 flex justify-center gap-6 border-b border-gray-300">
          {["photos", "favorites"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as Section)}
              className={`pb-3 text-lg font-semibold transition-colors ${
                activeSection === section
                  ? "border-b-4 border-yellow-500 text-yellow-600"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              {section === "photos" ? "Mis Fotos" : "Mis Favoritos"}
            </button>
          ))}
        </nav>

        {/* Secciones */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            {activeSection === "photos" ? "Mis Fotos" : "Mis Favoritos"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t bg-white mt-12">
        © 2025 PicIt. Todos los derechos reservados.
      </footer>
    </div>
  );
}
