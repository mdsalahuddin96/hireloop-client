"use client";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";

const RecruiterDashboardPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  return <div className="p-4 space-y-8">
    <h1 className="text-3xl">Welcome {user?.name}</h1>
    <DashboardStats/>
  </div>;
};

export default RecruiterDashboardPage;
