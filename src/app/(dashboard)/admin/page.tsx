import Announcements from "@/components/announcements";
import AttendancChart from "@/components/attendance-chart";
import CountChartContainer from "@/components/count-chart-container";
import EventCalendar from "@/components/event-calendar";
import FinanceChart from "@/components/finance-chart";
import UserCard from "@/components/user-card";

export default function AdminPage() {
  return (
    <section className="p-4 flex flex-col gap-4 md:flex-row">
      {/* MAIN SECTION */}
      <section className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* Top Cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>

        {/* Middle Charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Count Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendancChart />
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </section>
      {/* SIDEBAR SECTION */}
      <aside className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </aside>
    </section>
  );
}
