import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/member/Transaction/Transaction";

const TransactionMemeberPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="List Of All Transaction"
      type="member"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default TransactionMemeberPage;
