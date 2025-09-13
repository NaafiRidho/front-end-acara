import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/admin/DetailBanner/DetailBanner";
import DetailCategory from "@/components/views/admin/DetailCategory/DetailCategory";

const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      title="Detail Banner"
      description="manage information for this Banner"
      type="admin"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default AdminDetailBannerPage;
