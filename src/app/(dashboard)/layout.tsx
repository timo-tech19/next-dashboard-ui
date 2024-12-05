import Image from "next/image";
import Link from "next/link";

import Menu from "@/components/menu";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex">
      {/* SIBEBAR */}
      <aside className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">SchoolMNG</span>
        </Link>
        <Menu />
      </aside>

      {/* MAIN CONTENT */}
      <section className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]">
        Main Cotent
      </section>
    </main>
  );
}
