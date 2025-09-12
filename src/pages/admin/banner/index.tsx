import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/admin/banner/banner";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      description="list of all Banners, create new banner, and manage existing banners"
      type="admin"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;
