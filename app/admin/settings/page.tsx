import SettingsForm from "@/components/admin/SettingsForm";
import { getAdminSettings } from "@/lib/data/admin-settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">사이트 설정</h1>
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-text-soft">
        여기 저장된 값은 DB(site_settings)에 보관됩니다. 현재 공개 사이트의 푸터·연락처
        표시는 별도 환경변수 설정을 사용 중이라, 이 설정을 실제 화면에 반영하려면
        추가 연동 작업이 필요합니다. 필요하시면 말씀해주세요.
      </p>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
