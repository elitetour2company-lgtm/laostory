import Link from "next/link";
import type { GolfCourse } from "@/types";

const RECOMMENDED_FOR: Record<string, string> = {
  "lao-cc": "정교한 코스 관리와 전략적인 샷을 즐기고 싶은 분, 워킹 라운딩을 선호하는 분",
  "lakeview-cc": "쾌적한 신축 시설과 아름다운 호수 경관을 원하는 분",
  "longbien-cc": "다양한 홀 구성과 장타 코스를 즐기고 싶은 분, 편안한 한식 식사를 원하는 분",
  "luang-prabang-golf-club": "루앙프라방 여행 일정에 라운딩을 더하고 싶은 분",
  "mekong-cc": "한국어 소통과 한식 식사가 편한 분, 도전적인 코스를 원하는 분",
  "booyoung-cc": "골프텔처럼 편의시설까지 한번에 즐기고 싶은 분, 초보부터 장타자까지 다양한 코스를 원하는 분",
  "asia-club-vangvieng": "방비엥 여행 일정과 골프를 함께 즐기고 싶은 분",
};

export default function GolfCompareTable({ courses }: { courses: GolfCourse[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="bg-ivory">
            <th className="px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-text-soft">
              골프장
            </th>
            <th className="px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-text-soft">
              홀
            </th>
            <th className="px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-text-soft">
              카트
            </th>
            <th className="px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-text-soft">
              위치
            </th>
            <th className="min-w-[220px] px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-text-soft">
              이런 분께
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.slug} className="border-t border-border">
              <td className="px-4 py-3">
                <Link
                  href={`/golf/courses/${course.slug}`}
                  className="text-[14px] font-semibold text-forest hover:underline"
                >
                  {course.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-[13px] text-text">
                {course.holes}홀 · 파{course.par}
              </td>
              <td className="px-4 py-3 text-[13px] text-text">
                {course.includesCart ? "전동카트" : "워킹 (카트 없음)"}
              </td>
              <td className="px-4 py-3 text-[13px] text-text">{course.location}</td>
              <td className="min-w-[220px] px-4 py-3 text-[13px] leading-relaxed text-text-soft">
                {RECOMMENDED_FOR[course.slug] ?? ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
