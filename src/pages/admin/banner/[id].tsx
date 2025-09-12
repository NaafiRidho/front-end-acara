import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/admin/DetailCategory/DetailCategory";

const AdminDetailCategryPage = () => {
  return (
    <DashboardLayout
      title="Detail Category"
      description="manage information for this category"
      type="admin"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDetailCategryPage;
