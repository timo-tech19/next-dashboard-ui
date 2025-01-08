import Image from "next/image";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/form-container";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/table-search";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getRole } from "@/lib/utils";

type ExamList = Exam & {
  lesson: {
    teacher: Teacher;
    subject: Subject;
    class: Class;
  };
};

const renderRow = async (item: ExamList) => {
  const { role } = await getRole();
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-secondary-light"
    >
      <td className="flex items-center gap-4 p-4">
        {item.lesson.subject.name}
      </td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name} {item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="exam" type="update" data={item} />
              <FormContainer table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role, userId } = await getRole();
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
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
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
  const query: Prisma.ExamWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.lesson = {
              teacherId: value,
            };
            break;
          case "classId":
            query.lesson = {
              classId: Number(value),
            };
            break;
          case "search":
            query.lesson = {
              subject: { name: { contains: value, mode: "insensitive" } },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson = {
        teacherId: userId!,
      };
      break;
    case "student":
      query.lesson = {
        class: {
          students: {
            some: {
              id: userId!,
            },
          },
        },
      };
      break;
    case "parent":
      query.lesson = {
        class: {
          students: {
            some: {
              parentId: userId!,
            },
          },
        },
      };
      break;
    default:
      break;
  }

  const [exams, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            subject: { select: { name: true } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.exam.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tertiary">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tertiary">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="exam" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={exams} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ExamListPage;
