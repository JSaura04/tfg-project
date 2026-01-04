"use client";

import { LanguageSelector } from "@/components/language/LanguageSelector";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getUserFromCookie,
  UserCookieData,
} from "../../../configs/auth/getCookies";

export const HeaderMain = () => {
  const [user, setUser] = useState<UserCookieData | null>(null);

  useEffect(() => {
    const userData = getUserFromCookie();
    setUser(userData);
  }, []);

  return (
    <header className="w-full bg-[#dbaf1e]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-thumbnail.png"
            alt="PicIt logo"
            width={42}
            height={42}
          />
        </Link>

        {/* Brand */}
        <h1 className="text-white text-2xl font-bold tracking-wide">PicIt</h1>

        <LanguageSelector />
      </div>
    </header>
  );
};
