
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import withUser from "../hoc/with-user";
import DrawerLayout from "./drawer-layout";

import { useSelector } from "react-redux";


const PrivateLayout = () => {
  const user = useSelector(state => state.users.user);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
  <Header />

  <div className="flex flex-1 overflow-hidden ">
    {/* Sidebar */}
    <DrawerLayout />

    {/* Scrollable main content */}
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
      <Outlet />
    </main>
  </div>
</div>

    // <div className="flex flex-col min-h-screen">

    //   <Header />
      
    //   {/* <Layout> */}
    //   <DrawerLayout>
    //     <div className="flex-1">
    //       <Outlet />
    //     </div>
    //   </DrawerLayout>
    //   {/* </Layout> */}
    // </div>
  );
};

export default withUser(PrivateLayout);