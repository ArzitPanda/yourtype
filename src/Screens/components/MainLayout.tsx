import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import UserAvatarMenu from "./UserAvatarMenu";
import { supabase } from "@/components/context/SupabaseContext";
import Cookies from "js-cookie";

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

      if (user && !user.is_anonymous && user.email_confirmed_at) {
        let isQuizTaken = Cookies.get("is_quiz_taken");
          
        // Convert to boolean if it exists
        if (isQuizTaken !== undefined) {
          isQuizTaken = isQuizTaken === "true";
        } else {
          // Fetch from DB only if not in cookies
          const { data: profile, error } = await supabase
            .from("authuser")
            .select("is_quiz_taken")
            .eq("email", user.email)
            .maybeSingle();

          if (error) {
            console.error("Error fetching quiz status:", error);
            navigate("/", { replace: true });
            return;
          }

          isQuizTaken = profile?.is_quiz_taken || false;
          Cookies.set("is_quiz_taken", isQuizTaken.toString(), { expires: 1 }); // store for 1 day
        }

        if (isQuizTaken) {
          // Quiz taken → allow dashboard redirect
          if (!privateRoutes.includes(currentPath) && currentPath === "/") {
            navigate("/dashboard", { replace: true });
          }
        } else {
          // Quiz not taken → send to quiz flow
          if (!publicRoutes.includes(currentPath)) {
            navigate("/user-name", { replace: true });
          }
        }
      } else {
        // Not logged in and trying to access a private route
        console.log("anonymous user");
        if (privateRoutes.includes(currentPath)) {
          console.log(currentPath);
          console.log("haha");
          navigate("/", { replace: true });
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <main>
      <div className="bg-yellow-400 text-black text-center py-2 px-4 font-medium text-sm border-b">
        🚧 Development Mode - This is a development environment
      </div>
      <UserAvatarMenu />
      <Outlet />
    </main>
  );
};

export default MainLayout;
