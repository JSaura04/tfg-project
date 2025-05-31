import AuthRedirectButton from "@/components/auth/AuthRedirectButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen  overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/video-placeholder.mp4"
      />

      <div className="flex flex-col  rounded-2x items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center text-white">
        <Image src="/logo-thumbnail.png" alt="Logo" width={200} height={250} />

        <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg mb-6">
          Bienvenido a <span className="text-[#dbaf1e]">PicIt</span>
        </h1>
        <p className="max-w-xl mb-10 text-lg sm:text-xl drop-shadow-md">
          Captura y comparte momentos únicos con nuestra plataforma de fotos.
        </p>

        <AuthRedirectButton />

        <Link href="./pages/auth/login"></Link>
      </div>
    </main>
  );
}
