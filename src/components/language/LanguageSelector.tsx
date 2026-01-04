"use client";

import { AVAILABLE_LOCALES } from "@/app/layout";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";

export const LanguageSelector: FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languages");
  const toggleOpen = () => setOpen((prev) => !prev);

  const handleChangeLocale = (locale: string) => {
    setOpen(false);

    const segments = pathname.split("/").filter(Boolean);
    segments[0] = locale;

    const newPath = "/" + segments.join("/");

    router.push(newPath);
  };

  return (
    <div className="relative inline-block lg:text-left">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-white focus:outline-none"
        aria-label="Select Language"
      >
        <Globe size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white text-black  shadow-lg z-50">
          <ul className="flex flex-col">
            {AVAILABLE_LOCALES.map((locale) => (
              <li key={locale}>
                <button
                  onClick={() => handleChangeLocale(locale)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors"
                >
                  {t(locale.toUpperCase())}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
