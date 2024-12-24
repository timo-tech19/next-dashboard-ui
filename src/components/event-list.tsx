import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return (
    <>
      {data.map((event) => (
        <div
          className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-primary even:border-t-secondary"
          key={event.id}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">{event.title}</h3>
            <span className="text-gray-400 text-xs">
              {event.startTime.toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
          <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
        </div>
      ))}
      {data.length === 0 && (
        <div className="text-gray-400 text-xs">No events for today</div>
      )}
    </>
  );
};

export default EventList;
