import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import withAuth from "../hoc/with-auth";

const PublicLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Optional: Use your Header component instead of inline <header> */}
      <header className="flex items-center justify-between bg-primarylight px-6 py-3 shadow-sm font-roboto flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="font-bold text-3xl text-white-pure hidden md:block">
            TaskMaster
          </div>
        </div>
      </header>

     
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default withAuth(PublicLayout);
