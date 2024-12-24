import Image from "next/image";
import EventList from "./event-list";
import EventCalendar from "./event-calendar";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { date } = searchParams;

  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold my-4">Events</h2>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
