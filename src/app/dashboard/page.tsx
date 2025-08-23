
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FarmerDashboard from "@/components/dashboards/farmer-dashboard";
import BuyerDashboard from "@/components/dashboards/buyer-dashboard";
import AdminDashboard from "@/components/dashboards/admin-dashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  switch (role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="flex h-screen items-center justify-center">
            <p>No role assigned. Please contact support.</p>
        </div>
      )
  }
}
