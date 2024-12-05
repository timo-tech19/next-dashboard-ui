export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex">
      {/* SIBEBAR */}
      <aside className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-blue-100">
        Side Bar
      </aside>

      {/* MAIN CONTENT */}
      <section className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-green-100">
        Main Cotent
      </section>
    </main>
  );
}
