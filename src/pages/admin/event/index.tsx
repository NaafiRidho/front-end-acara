import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/admin/event/event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="list of all events, create new event, and manage existing events"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
