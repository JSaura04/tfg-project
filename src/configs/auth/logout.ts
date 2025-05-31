"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  function logout() {
    // Borrar cookie 'user' estableciendo una fecha pasada
    document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

    // Redirigir al home
    router.push("/");
  }

  return logout;
}
