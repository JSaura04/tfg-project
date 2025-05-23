"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserFromCookie, UserCookieData } from "../auth/getCookies";

export const HeaderMain = () => {
  const [user, setUser] = useState<UserCookieData | null>(null);

  useEffect(() => {
    const userData = getUserFromCookie();
    setUser(userData);
  }, []);

  return (
    <div className="w-full bg-[#dbaf1e] flex items-center justify-between p-4">
      <Link href="/">
        <Image src="/logo-thumbnail.png" alt="Logo" width={100} height={150} />
      </Link>
      <div className="flex-1 flex justify-center">
        <h1 className="text-white text-3xl font-bold">PicIt</h1>
      </div>
      <div className="mr-4 text-white font-medium">
        {user ? user.nombre : ""}
      </div>
    </div>
  );
};
