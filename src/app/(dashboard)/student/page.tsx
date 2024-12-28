import Announcements from "@/components/announcements";
import BigCalendarContainer from "@/components/big-calendar-container";
import EventCalendar from "@/components/event-calendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function StudentPage() {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  return (
    <section className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* MAIN Section */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 pb-8 rounded-md">
          <h1 className="text-xl font-semibold">Schedule 4(A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>

      {/* SIDEBAR SECTION */}
      <aside className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </aside>
    </section>
  );
}
