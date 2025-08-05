import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/admin/dashboard/dashboard";

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="dashboard admin"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
