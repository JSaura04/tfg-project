import { db } from "@/configs/auth/firebase_config";
import { doc, updateDoc } from "firebase/firestore";

/**
 * Actualiza la foto de perfil del usuario en Firestore.
 *
 * @param userId - ID del usuario.
 * @param newProfileImageBase64 - Imagen en base64 (string).
 * @returns Promise con resultado de la operación.
 */
export const updateUserProfileImage = async (
  userId: string,
  newProfileImageBase64: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      profileImageBase64: newProfileImageBase64,
    });

    return {
      success: true,
      message: "Foto de perfil actualizada correctamente",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al actualizar la foto de perfil",
    };
  }
};
