import GolfCourseForm from "@/components/admin/GolfCourseForm";

export default function NewGolfCoursePage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">새 골프장 추가</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <GolfCourseForm />
      </div>
    </div>
  );
}
