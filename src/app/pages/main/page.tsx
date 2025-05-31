"use client";
import { HeaderNav } from "@/components/header/components/HeaderNav";
import Image from "next/image";
import { useRouter } from "next/navigation";

const images = [
  "/gallery/img1.jpg",
  "/gallery/img2.jpg",
  "/gallery/img3.jpg",
  "/gallery/img4.jpg",
  "/gallery/img5.jpg",
  "/gallery/img6.jpg",
  "/gallery/img7.jpg",
  "/gallery/img8.jpg",
  // Añade tus propias imágenes reales
];

export default function HomePage() {
  const router = useRouter();

  const handleUpload = () => {
    router.push("/upload");
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-800">
      {/* Header */}
      <HeaderNav />

      {/* Hero */}
      <section className="text-center py-16 px-4 bg-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Comparte tu mundo en imágenes
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Inspírate, descubre y guarda lo que te gusta en la red visual más
          creativa: PicIt.
        </p>
        <button
          onClick={handleUpload}
          className="bg-[#dbaf1e] hover:bg-yellow-500 transition-colors text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          Subir Imagen
        </button>
      </section>

      {/* Galería tipo Pinterest */}
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-xl shadow"
            >
              <Image
                src={src}
                alt={`Foto ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 mt-10 border-t">
        © 2025 PicIt. Todos los derechos reservados.
      </footer>
    </div>
  );
}
