import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3rBu0ob-MDCf8R4puq-1qwjBBaNAiU4M",
  authDomain: "picit-39fe0.firebaseapp.com",
  projectId: "picit-39fe0",
  storageBucket: "picit-39fe0.appspot.com",
  messagingSenderId: "368218208144",
  appId: "1:368218208144:web:aa520750f631cc4d4d6515",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const generateRandomId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const loadPlaceholderImageBase64 = async (): Promise<string> => {
  const response = await fetch("/Portrait_Placeholder.png");
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

const loadBannerImageBase64 = async (): Promise<string> => {
  const response = await fetch("/banner.png");
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const customId = generateRandomId();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const imageBase64 = await loadPlaceholderImageBase64();
    const bannerBase64 = await loadBannerImageBase64();

    await setDoc(doc(db, "users", customId), {
      id: customId,
      nombre: username,
      correo: email,
      password: hashedPassword,
      profileImageBase64: imageBase64,
      bannerImageBase64: bannerBase64,
    });

    return { success: true, message: "Usuario registrado exitosamente" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al registrar usuario",
    };
  }
};

// lib/firebase/updatePost.ts

/**
 * Actualiza los datos de una imagen en Firestore.
 * @param id ID del documento (imagen).
 * @param title Nuevo título.
 * @param description Nueva descripción.
 */
export async function updatePost(
  id: string,
  title: string,
  description: string
) {
  const ref = doc(db, "images", id);
  await updateDoc(ref, {
    title,
    description,
  });
}

export { app, auth, db, storage };
