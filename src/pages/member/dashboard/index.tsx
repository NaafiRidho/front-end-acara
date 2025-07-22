import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/member/dashboard/dashboard";

const DashboardMemeberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="dashboard member"
      type="member"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardMemeberPage;
