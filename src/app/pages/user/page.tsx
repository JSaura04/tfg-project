"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import { db } from "@/configs/auth/firebase_config";
import { getUserFromCookie, UserCookieData } from "@/configs/auth/getCookies";
import { updateUserBannerImage } from "@/configs/user/setBannerPicture";
import { updateUserProfileImage } from "@/configs/user/setProfilePicture";

import { FooterMain } from "@/components/footer/FooterMain";
import { HeaderNav } from "@/components/header/components/HeaderNav";
import { OverlayMessage } from "@/components/overlay/OverlayMessage";
import { PageWrapper } from "@/components/overlay/PageWrapper";
import { Photo, UserImage as PhotoType } from "@/components/photos/Photo";

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserCookieData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [userImages, setUserImages] = useState<PhotoType[]>([]);
  const [activeSection, setActiveSection] = useState<"photos">("photos");
  const [selectedImage, setSelectedImage] = useState<PhotoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [updatingBanner, setUpdatingBanner] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const cookieUser = getUserFromCookie();
      if (!cookieUser) {
        setLoading(false);
        return;
      }

      setUser(cookieUser);

      try {
        // Obtener datos del usuario
        const userSnap = await getDoc(doc(db, "users", cookieUser.id));
        const userData = userSnap.data();

        if (userData) {
          setProfileImage(userData.profileImageBase64 || null);
          setBannerImage(userData.bannerImageBase64 || null);
        }

        // Fotos subidas por el usuario
        const photosQuery = query(
          collection(db, "images"),
          where("authorId", "==", cookieUser.id)
        );
        const photosSnapshot = await getDocs(photosQuery);
        const photos = photosSnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            publicId: d.publicId || "",
            imageUrl: d.imageUrl,
            title: d.title || "Sin título",
            description: d.description || "Sin descripción",
            creatorId: d.authorId,
          };
        });
        setUserImages(photos);
      } catch (error) {
        console.error("Error loading user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject("Error converting to base64");
      reader.onerror = () => reject("Error reading file");
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    updateFn: typeof updateUserProfileImage | typeof updateUserBannerImage,
    setLoadingFn: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const file = e.target.files?.[0];
    if (!user || !file) return;

    setLoadingFn(true);
    try {
      const base64 = await fileToBase64(file);
      const response = await updateFn(user.id, base64);

      if (response.success) {
        updateFn === updateUserProfileImage
          ? setProfileImage(base64)
          : setBannerImage(base64);
        await Swal.fire("¡Éxito!", "Imagen actualizada", "success");
        window.location.reload();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      await Swal.fire("Error", "No se pudo actualizar la imagen", "error");
    } finally {
      setLoadingFn(false);
    }
  };

  if (loading) {
    return <PageWrapper>Cargando perfil...</PageWrapper>;
  }

  if (!user) {
    return <PageWrapper>No se encontró información del usuario.</PageWrapper>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-gray-800">
      <HeaderNav />

      {/* Banner */}
      <div className="relative h-60 md:h-72 w-full bg-gray-300">
        <button
          onClick={() => router.push("/pages/user/configuration")}
          title="Configuración de cuenta"
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-yellow-100 z-10"
        >
          <Settings className="w-6 h-6" />
        </button>

        <div
          onClick={() => bannerInputRef.current?.click()}
          className="absolute inset-0 cursor-pointer"
        >
          {bannerImage ? (
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400" />
          )}
          <OverlayMessage
            message={
              updatingBanner ? "Actualizando banner..." : "Cambiar banner"
            }
          />
        </div>

        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            handleImageUpload(e, updateUserBannerImage, setUpdatingBanner)
          }
        />

        {/* Avatar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 w-36 h-36 rounded-full border-4 border-white overflow-hidden shadow-lg cursor-pointer"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-yellow-300 w-full h-full flex items-center justify-center text-yellow-700 font-bold text-xl">
              Sin foto
            </div>
          )}
          <OverlayMessage
            message={updatingImage ? "Actualizando..." : "Cambiar foto"}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            handleImageUpload(e, updateUserProfileImage, setUpdatingImage)
          }
        />
      </div>

      {/* Contenido */}
      <main className="pt-28 px-4 md:px-6 max-w-6xl mx-auto flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">{user.nombre}</h1>

        {/* Solo pestaña Mis Fotos */}
        <nav className="flex justify-center space-x-6 border-b border-gray-300 mb-8">
          <button className="pb-2 text-lg font-medium border-b-4 border-yellow-500 text-yellow-600">
            Mis Fotos
          </button>
        </nav>

        {/* Galería de fotos subidas */}
        {userImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userImages.map((img) => (
              <Photo
                key={img.id}
                image={img}
                currentUserId={user.id}
                onClick={() => {
                  setSelectedImage(img);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">
            No has subido imágenes aún.
          </p>
        )}
      </main>

      {/* Modal Imagen */}
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white max-w-3xl w-full p-6 rounded-lg relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-2xl"
              aria-label="Cerrar modal"
            >
              &times;
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full max-h-[60vh] object-contain"
            />
            <h2 className="text-2xl font-semibold mt-4">
              {selectedImage.title}
            </h2>
            <p className="text-gray-600 mt-2 whitespace-pre-line">
              {selectedImage.description}
            </p>
          </div>
        </div>
      )}

      <FooterMain />
    </div>
  );
}
