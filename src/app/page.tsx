import AuthRedirectButton from "@/components/auth/AuthRedirectButton";
import { FooterMain } from "@/components/footer/FooterMain";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
        src="/video-placeholder.mp4"
      />

      <div className="absolute inset-0 bg-black/60 -z-10" />

      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <Image
          src="/logo-thumbnail.png"
          alt="PicIt Logo"
          width={160}
          height={160}
          className="mb-6"
        />

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          Comparte tus momentos con{" "}
          <span className="text-[#dbaf1e]">PicIt</span>
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl text-gray-200 mb-10">
          Una plataforma moderna para capturar, guardar y compartir fotografías
          increíbles de forma rápida y segura.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <AuthRedirectButton />
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white text-gray-800 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            ¿Por qué elegir <span className="text-[#dbaf1e]">PicIt</span>?
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Diseñada para fotógrafos, creadores y amantes de los recuerdos.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Subida rápida",
                desc: "Carga tus fotos en segundos desde cualquier dispositivo.",
                icon: "⚡",
              },
              {
                title: "Seguridad total",
                desc: "Tus recuerdos protegidos con tecnología moderna.",
                icon: "🔒",
              },
              {
                title: "Comparte fácil",
                desc: "Comparte álbumes con un solo enlace.",
                icon: "🌍",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-24 px-6 text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Cómo funciona
          </h2>

          <div className="grid gap-12 md:grid-cols-3 text-center">
            <div>
              <div className="text-5xl font-extrabold text-[#dbaf1e] mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Regístrate</h3>
              <p className="text-gray-600">Crea tu cuenta en segundos.</p>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-[#dbaf1e] mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Sube tus fotos</h3>
              <p className="text-gray-600">
                Organiza tus recuerdos fácilmente.
              </p>
            </div>

            <div>
              <div className="text-5xl font-extrabold text-[#dbaf1e] mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Comparte</h3>
              <p className="text-gray-600">Muestra tus momentos al mundo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL
      <section className="bg-[#dbaf1e] py-20 px-6 text-center text-black">
        <h2 className="text-4xl font-extrabold mb-6">
          Empieza a crear recuerdos hoy
        </h2>
        <p className="mb-8 text-lg">
          Únete a PicIt y transforma tus fotos en historias.
        </p>

        <AuthRedirectButton />
      </section> */}

      <FooterMain />
    </main>
  );
}
