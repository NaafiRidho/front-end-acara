import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/admin/DetailEvent/DetailEvent";

const AdminDetailEventPage = () => {
  return (
    <DashboardLayout
      title="Detail Category"
      description="manage information for this Event"
      type="admin"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};

export default AdminDetailEventPage;
