"use client";

import { db } from "@/configs/auth/firebase_config";
import { getUserFromCookie, UserCookieData } from "@/configs/auth/getCookies";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const HeaderNav = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserCookieData | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(
    null
  );

  useEffect(() => {
    const userData = getUserFromCookie();
    setUser(userData);

    const fetchProfileImage = async () => {
      if (!userData) return;

      try {
        const userDocRef = doc(db, "users", userData.id);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.profileImageBase64) {
            setProfileImageBase64(data.profileImageBase64);
          }
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const logout = () => {
    document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    router.push("/");
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-[#dbaf1e]">
        <Link href="/pages/main">
          <Image
            src="/logo-thumbnail.png"
            alt="Logo"
            width={50}
            height={100}
            priority
          />
        </Link>
      </h1>

      <nav className="flex gap-4 text-sm font-medium items-center">
        <Link href="/explore" className="hover:text-yellow-600">
          Explorar
        </Link>
        <Link href="/about" className="hover:text-yellow-600">
          Foros
        </Link>

        <Link href="/pages/user">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <span>{user.nombre}</span>
            {profileImageBase64 ? (
              <img
                src={profileImageBase64}
                alt="Perfil"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 border border-gray-300" />
            )}
          </div>
        </Link>

        <button
          onClick={logout}
          className="ml-4 px-3 py-1 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
          type="button"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
};
