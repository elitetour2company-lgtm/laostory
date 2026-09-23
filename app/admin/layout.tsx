import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/lib/admin/get-session";
import { getDashboardStats } from "@/lib/data/admin-stats";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();

  // /admin/login renders its own full-screen layout with no session yet.
  if (!session) {
    return <>{children}</>;
  }

  const pendingInquiries = await getDashboardStats()
    .then((stats) => stats.pendingInquiries)
    .catch(() => 0);

  return (
    <div className="flex">
      <AdminSidebar adminName={session.name} pendingInquiries={pendingInquiries} />
      <main className="min-h-screen flex-1 bg-bg">{children}</main>
    </div>
  );
}
