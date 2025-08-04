import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { supabase } from "@/components/context/SupabaseContext";
  import { LogOut } from "lucide-react";
  import { useEffect, useState } from "react";
  
  const UserAvatarMenu = () => {
    const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const { data } = await supabase.auth.getUser();
        console.log(data)
        setUser(data.user);
      };
      fetchUser();
    }, []);
  
    if (!user) return null;
  
    const avatarUrl = user?.user_metadata?.avatar_url;
    const fullName = user?.user_metadata?.full_name || user?.email || "User";
  
    const handleLogout = async () => {
      await supabase.auth.signOut();
      window.location.href = "/"; // or route to your login page
    };
  
    return (
   <div className="absolute top-5 right-5 ring-2 ring-yellow-400 rounded-full  z-50">
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border border-white">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback>{fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="truncate max-w-[200px]">{fullName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
   </div>
    );
  };
  
  export default UserAvatarMenu;
  