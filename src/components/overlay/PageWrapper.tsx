import { FooterMain } from "@/components/footer/FooterMain";
import { HeaderNav } from "@/components/header/components/HeaderNav";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-neutral-50">
    <HeaderNav />
    <main className="flex-grow flex items-center justify-center text-gray-600 text-lg">
      {children}
    </main>
    <FooterMain />
  </div>
);
