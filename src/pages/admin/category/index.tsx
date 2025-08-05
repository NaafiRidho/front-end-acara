import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/admin/category/category";

const AdminCategryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="list of all categories, create new category, and manage existing categories"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategryPage;
