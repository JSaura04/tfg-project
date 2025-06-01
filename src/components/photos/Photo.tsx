"use client";

import { db, updatePost } from "@/configs/auth/firebase_config";
import { deleteDoc, doc } from "firebase/firestore";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export type UserImage = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  creatorId: string;
  publicId: string;
};

type PhotoProps = {
  image: UserImage;
  currentUserId: string;
  onClick: () => void;
  onDeleteComplete?: () => void;
};

export function Photo({
  image,
  currentUserId,
  onClick,
  onDeleteComplete,
}: PhotoProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isOwner = image.creatorId === currentUserId;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const confirm = await Swal.fire({
      title: "¿Eliminar esta imagen?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "images", image.id));
      Swal.fire(
        "Eliminado",
        "La imagen se ha eliminado correctamente.",
        "success"
      );
      onDeleteComplete?.();
      router.refresh(); // También puedes recargar al eliminar si deseas
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "No se pudo eliminar la imagen. Intenta de nuevo.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const { value: formValues } = await Swal.fire({
      title: "Editar imagen",
      html: `
      <input id="swal-input-title" class="swal2-input" placeholder="Título" value="${image.title}">
      <textarea id="swal-input-description" class="swal2-textarea" placeholder="Descripción">${image.description}</textarea>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const title = (
          document.getElementById("swal-input-title") as HTMLInputElement
        )?.value;
        const description = (
          document.getElementById(
            "swal-input-description"
          ) as HTMLTextAreaElement
        )?.value;
        if (!title.trim()) {
          Swal.showValidationMessage("El título no puede estar vacío");
          return;
        }
        return { title, description };
      },
    });

    if (!formValues) return;

    try {
      setLoading(true);
      await updatePost(image.id, formValues.title, formValues.description);
      Swal.fire(
        "Actualizado",
        "La imagen fue actualizada con éxito",
        "success"
      );
      onDeleteComplete?.();
      // Forzar recarga completa
      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar la imagen", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-48 rounded-lg overflow-hidden border border-gray-300 shadow-sm cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      aria-label={`Ver detalles de la foto: ${image.title}`}
    >
      {isOwner && (
        <div className="absolute top-2 right-2 flex space-x-2 z-10">
          <button
            onClick={handleEdit}
            disabled={loading}
            title="Editar foto"
            className="p-1 rounded bg-white bg-opacity-80 hover:bg-opacity-100"
          >
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            title="Eliminar foto"
            className="p-1 rounded bg-white bg-opacity-80 hover:bg-opacity-100"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      )}

      <img
        src={image.imageUrl}
        alt={image.title}
        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-sm p-2 truncate">
        {image.title}
      </div>
    </div>
  );
}
