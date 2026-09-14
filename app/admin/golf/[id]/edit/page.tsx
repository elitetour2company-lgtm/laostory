import { notFound } from "next/navigation";
import GolfCourseForm from "@/components/admin/GolfCourseForm";
import { getAdminGolfCourseById } from "@/lib/data/admin-golf";

export default async function EditGolfCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getAdminGolfCourseById(id);
  if (!course) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">골프장 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <GolfCourseForm course={course} />
      </div>
    </div>
  );
}
