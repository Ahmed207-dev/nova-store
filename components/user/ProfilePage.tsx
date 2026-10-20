import DataProfile from "./DataProfile";
import UserActivityCards from "./UserActivityCards";

const ProfilePage = () => {
  return (
    <div className="min-h-screen py-8 px-4 text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-100 tracking-tight">
          User Profile
        </h1>
        <div className="w-full flex justify-center mb-8">
          <DataProfile />
        </div>

        <UserActivityCards />
      </div>
    </div>
  );
};

export default ProfilePage;
