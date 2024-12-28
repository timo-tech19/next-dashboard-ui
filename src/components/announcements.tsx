import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
    take: 3,
    orderBy: { date: "desc" },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Announcements</h2>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data[0] && (
          <div className="bg-primary-light rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{data[0].title}</div>
              <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{data[0].description}</p>
          </div>
        )}

        {data[1] && (
          <div className="bg-secondary-light rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{data[1].title}</div>
              <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{data[1].description}</p>
          </div>
        )}

        {data[2] && (
          <div className="bg-tertiary-light rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{data[2].title}</div>
              <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
