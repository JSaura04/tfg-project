"use client";

import { FooterMain } from "@/components/footer/FooterMain";
import { HeaderNav } from "@/components/header";
import { Button } from "@/components/primitives";
import { getUserFromCookie, UserCookieData } from "@/configs/auth/getCookies";
import { uploadToCloudinary } from "@/configs/cloudinary/index";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { db } from "@/configs/auth/firebase_config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function UploadPage() {
  // Estados para manejar datos y UI
  const [user, setUser] = useState<UserCookieData | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Obtener usuario desde cookie al montar componente
  useEffect(() => {
    const userData = getUserFromCookie();
    console.log("User from cookie:", userData);
    setUser(userData);
  }, []);

  // Maneja la selección de la imagen, valida tipo y crea preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire(
          "Archivo inválido",
          "Por favor selecciona una imagen.",
          "error"
        );
        setImageFile(null);
        setPreviewUrl(null);
        return;
      }
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  // Maneja el envío del formulario: valida, sube imagen y guarda datos en Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !title.trim() || !description.trim()) {
      Swal.fire(
        "Campos incompletos",
        "Por favor, completa todos los campos.",
        "warning"
      );
      return;
    }

    if (!user) {
      Swal.fire("Usuario no identificado", "Debes iniciar sesión.", "error");
      return;
    }

    setUploading(true);

    try {
      console.log("Iniciando subida. Usuario:", user);
      console.log("Archivo seleccionado:", imageFile);

      // Subir imagen y obtener URL
      const imageUrl = await uploadToCloudinary(imageFile);

      // Guardar documento en Firestore con los datos
      await addDoc(collection(db, "images"), {
        title: title.trim(),
        description: description.trim(),
        authorId: user.id,
        authorName: user.nombre,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      Swal.fire("¡Éxito!", "Imagen publicada con éxito.", "success");

      // Resetear formulario
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error: any) {
      console.error("Error en handleSubmit:", error);
      Swal.fire(
        "Error",
        error.message || "Hubo un error al subir la imagen.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderNav />

      <section className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-all duration-300">
          {/* Área para subir imagen y mostrar preview */}
          <div className="relative p-6 border-b lg:border-b-0 lg:border-r border-gray-200 flex items-center justify-center bg-gray-50">
            <label
              htmlFor="image-upload"
              className="w-full h-[300px] md:h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-yellow-400 rounded-2xl cursor-pointer hover:bg-yellow-100 transition-all"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-full max-w-full object-cover rounded-xl shadow-sm hover:scale-105 transition-transform"
                />
              ) : (
                <>
                  <p className="text-gray-600 font-medium">
                    Haz clic para subir una imagen
                  </p>
                  <p className="text-sm text-gray-400 mt-1">(JPG, PNG, WebP)</p>
                </>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={uploading}
            />
          </div>

          {/* Formulario de título, descripción y botón */}
          <form
            onSubmit={handleSubmit}
            className="p-8 flex flex-col gap-5 justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Publicar imagen
            </h2>

            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              disabled={uploading}
            />

            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              disabled={uploading}
            />

            <div className="text-sm text-gray-500">
              Autor:{" "}
              <span className="text-black font-semibold">
                {user?.nombre || "No identificado"}
              </span>
            </div>

            <Button
              type="submit"
              className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-white text-lg py-3 rounded-xl transition-colors"
              disabled={uploading}
            >
              {uploading ? "Subiendo..." : "Publicar"}
            </Button>
          </form>
        </div>
      </section>

      <FooterMain />
    </main>
  );
}
