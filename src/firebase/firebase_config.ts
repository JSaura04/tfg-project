import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3rBu0ob-MDCf8R4puq-1qwjBBaNAiU4M",
  authDomain: "picit-39fe0.firebaseapp.com",
  projectId: "picit-39fe0",
  storageBucket: "picit-39fe0.firebasestorage.app",
  messagingSenderId: "368218208144",
  appId: "1:368218208144:web:aa520750f631cc4d4d6515",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const generateRandomId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
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

    await setDoc(doc(db, "users", customId), {
      id: customId,
      nombre: username,
      correo: email,
      password: hashedPassword,
    });

    return { success: true, message: "Usuario registrado exitosamente" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al registrar usuario",
    };
  }
};

export { app, auth, db };
