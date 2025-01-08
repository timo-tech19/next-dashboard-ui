import Announcements from "@/components/announcements";
import BigCalendarContainer from "@/components/big-calendar-container";
import prisma from "@/lib/prisma";
import { getRole } from "@/lib/utils";

export default async function ParentPage() {
  const { userId } = await getRole();

  const students = await prisma.student.findMany({
    where: {
      parentId: userId!,
    },
  });

  return (
    <section className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* MAIN Section */}
      {students.map((student) => (
        <div key={student.id} className="w-full xl:w-2/3">
          <div className="h-full bg-white p-4 pb-8 rounded-md">
            <h1 className="text-xl font-semibold">
              Schedule ({student.name + " " + student.surname})
            </h1>
            <BigCalendarContainer type="classId" id={student.classId} />
          </div>
        </div>
      ))}

      {/* SIDEBAR SECTION */}
      <aside className="w-full lg:w-1/3 flex flex-col gap-8">
        <Announcements />
      </aside>
    </section>
  );
}
