import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/member/DetailTransaction/DetailTransaction";


const DetailTransactionMemeberPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Information for Spesific Transaction"
      type="member"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default DetailTransactionMemeberPage;
