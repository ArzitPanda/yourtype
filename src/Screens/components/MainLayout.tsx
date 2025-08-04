import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import UserAvatarMenu from "./UserAvatarMenu";
import { supabase } from "@/components/context/SupabaseContext";

const publicRoutes = [
  "/",
  "/login",
  "/age-selector",
  "/user-name",
  "/zodiac-seletor",
  "/question-splash",
  "/question-answer",
  "/final-screen",
   "/termspolicy"
];

const privateRoutes = [
  "/valid/pricing-screen",
  // allowed for both
  "/dashboard",
  "/return-url",
  "/compare/search",
  "/compare",
  "/compare/share",
 "/termspolicy"
];

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      const user = session?.user;
      const currentPath = location.pathname;

      if (user) {
        // Logged in user trying to access public-only route like "/"
        if (!privateRoutes.includes(currentPath) && currentPath === "/") {
          navigate("/dashboard", { replace: true });
        }
      } else {
        // Not logged in and trying to access a private route
        if (privateRoutes.includes(currentPath)) {
          navigate("/", { replace: true });
        }
      }
    };

    checkAuth();
  }, [location]);

  return (
    <main>
      <UserAvatarMenu />
      <Outlet />
    </main>
  );
};

export default MainLayout;
