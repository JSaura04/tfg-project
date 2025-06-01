"use client";

import { FooterMain } from "@/components/footer/FooterMain";
import { HeaderNav } from "@/components/header/components/HeaderNav";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// URLs de imágenes aleatorias de Picsum Photos con IDs específicos para variedad y consistencia
const picsumImageIds = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export default function HomePage() {
  const router = useRouter();

  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...picsumImageIds]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((id) => `https://picsum.photos/id/${id}/500/500`);
    setShuffledImages(shuffled);
  }, []);

  const handleUpload = () => {
    router.push("/upload");
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-800">
      <HeaderNav />
      <section className="text-center py-16 px-4 bg-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Comparte tu mundo en imágenes
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Inspírate, descubre y guarda lo que te gusta en la red visual más
          creativa: PicIt.
        </p>
      </section>

      <section className="px-4 py-10 max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {shuffledImages.length > 0 ? (
            shuffledImages.map((src, index) => (
              <div
                key={index}
                className="break-inside-avoid overflow-hidden rounded-xl shadow"
              >
                <Image
                  src={src}
                  alt={`Imagen aleatoria ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-200"
                  priority={index === 0} // Para priorizar la primera imagen
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">Cargando imágenes...</p>
          )}
        </div>
      </section>
      <FooterMain />
    </div>
  );
}
