import { adminRpc } from "@/lib/supabase/admin-rpc";

type DashboardStats = {
  totalInquiries: number;
  pendingInquiries: number;
  todayInquiries: number;
  recentInquiries: {
    id: string;
    name: string;
    phone: string;
    message: string;
    status: string;
    created_at: string;
  }[];
  featuredProducts: { slug: string; title: string; price: number; category: string }[];
  recentReviews: {
    id: string;
    customer_name: string;
    product: string;
    rating: number;
    created_at: string;
  }[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
  return adminRpc<DashboardStats>("admin_dashboard_stats");
}
