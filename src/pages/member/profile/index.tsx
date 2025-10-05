import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/member/Profile/Profile";

const ProfileMemeberPage = () => {
  return (
    <DashboardLayout
      title="Profile"
      description="Manage Your Profile And Security"
      type="member"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default ProfileMemeberPage;
