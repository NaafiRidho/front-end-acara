import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/admin/DetailTransaction/DetailTransaction";


const DetailTransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Information for Spesific Transaction"
      type="admin"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default DetailTransactionAdminPage;
