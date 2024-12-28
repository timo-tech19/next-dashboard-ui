import Announcements from "@/components/announcements";
import BigCalendarContainer from "@/components/big-calendar-container";
import { auth } from "@clerk/nextjs/server";

export default async function TeacherPage() {
  const { userId } = await auth();

  return (
    <section className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* MAIN Section */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 pb-8 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>

      {/* SIDEBAR SECTION */}
      <aside className="w-full lg:w-1/3 flex flex-col gap-8">
        <Announcements />
      </aside>
    </section>
  );
}
