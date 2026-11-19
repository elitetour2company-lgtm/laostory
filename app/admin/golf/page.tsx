import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminGolfCourses } from "@/lib/data/admin-golf";
import { formatAdminPrice } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";
import AdminMobileCard, { MobileEditLink } from "@/components/admin/AdminMobileCard";
import { deleteGolfCourseAction } from "@/lib/admin/golf-actions";

export const dynamic = "force-dynamic";

const DIFFICULTY_LABEL: Record<string, string> = {
  EASY: "쉬움",
  NORMAL: "보통",
  HARD: "어려움",
};

export default async function AdminGolfPage() {
  const courses = await getAdminGolfCourses();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">골프장 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {courses.length}개 골프장</p>
        </div>
        <Link
          href="/admin/golf/new"
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-forest-light"
        >
          <Plus size={15} strokeWidth={2} />
          새 골프장 추가
        </Link>
      </div>

      {/* Phone: one card per row (tables are PC only) */}
      <div className="mt-6 space-y-3 md:hidden">
        {courses.map((course) => (
          <AdminMobileCard
            key={course.id}
            title={course.name}
            meta={[course.location, DIFFICULTY_LABEL[course.difficulty] ?? course.difficulty]}
            right={formatAdminPrice(course.price)}
          >
            <MobileEditLink href={`/admin/golf/${course.id}/edit`} />
            <DeleteButton
              variant="button"
              id={course.id}
              action={deleteGolfCourseAction}
              confirmMessage={`"${course.name}" 골프장을 삭제하시겠습니까?`}
            />
          </AdminMobileCard>
        ))}
        {courses.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 골프장이 없습니다.
          </p>
        ) : null}
      </div>

      <div className="mt-6 hidden overflow-x-auto rounded-md border border-border bg-white md:block">
        <table className="w-full min-w-[680px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">골프장명</th>
              <th className="px-4 py-3 font-medium">지역</th>
              <th className="px-4 py-3 font-medium">난이도</th>
              <th className="px-4 py-3 font-medium">가격</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-4 py-3.5 font-medium text-text">{course.name}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {course.location}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {DIFFICULTY_LABEL[course.difficulty] ?? course.difficulty}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {formatAdminPrice(course.price)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/golf/${course.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={course.id}
                      action={deleteGolfCourseAction}
                      confirmMessage={`"${course.name}" 골프장을 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 골프장이 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
