import { HeaderMain } from "@/components/header";
import { Button } from "@/components/primitives";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <HeaderMain />
      <Link href="./pages/auth/login">
        <Button className="bg-[#dbaf1e]">Link</Button>
      </Link>
    </main>
  );
}
