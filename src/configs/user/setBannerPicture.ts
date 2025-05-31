import { db } from "@/configs/auth/firebase_config";
import { doc, updateDoc } from "firebase/firestore";

/**
 * Actualiza el banner del usuario en Firestore.
 *
 * @param userId - ID del usuario.
 * @param newBannerImageBase64 - Imagen del banner en base64 (string).
 * @returns Promise con resultado de la operación.
 */
export const updateUserBannerImage = async (
  userId: string,
  newBannerImageBase64: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      bannerImageBase64: newBannerImageBase64,
    });

    return {
      success: true,
      message: "Banner actualizado correctamente",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al actualizar el banner",
    };
  }
};
