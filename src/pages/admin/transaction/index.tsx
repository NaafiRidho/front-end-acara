import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/admin/Transaction/Transaction";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="List Of All Transaction"
      type="admin"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default TransactionAdminPage;
