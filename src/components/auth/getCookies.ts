export interface UserCookieData {
  id: string;
  nombre: string;
  correo: string;
}

export function getUserFromCookie(): UserCookieData | null {
  const name = "user=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      const value = decodeURIComponent(cookie.substring(name.length));
      try {
        const parsed: UserCookieData = JSON.parse(value);
        return parsed;
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        return null;
      }
    }
  }

  return null;
}
