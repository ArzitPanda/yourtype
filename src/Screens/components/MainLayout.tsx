import { Outlet } from "react-router";
import UserAvatarMenu from "./UserAvatarMenu";


const MainLayout = () => {
  return (
  
    
      <main>
      <UserAvatarMenu />
        <Outlet />
      </main>

  );
};

export default MainLayout;
