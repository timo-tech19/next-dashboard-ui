import FormModal from "@/components/form-modal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getRole } from "@/lib/utils";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type LessonList = Lesson & {
  teacher: Teacher;
  subject: Subject;
  class: Class;
};

const renderRow = async (item: LessonList) => {
  const { role } = await getRole();
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-secondary-light"
    >
      <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">
        {item.teacher.name} {item.teacher.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role } = await getRole();

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];
  const { page, ...queryParams } = searchParams;
  const p = page ? Number(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.teacherId = value;
            break;
          case "classId":
            query.classId = Number(value);
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [lessons, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
        subject: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tertiary">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tertiary">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={lessons} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default LessonListPage;
