import { supabase } from '@/components/context/SupabaseContext'
import { UserContextStore } from '@/components/context/UserContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Cookies from 'js-cookie'
import React, { use, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

const UserNameScreen = () => {


    const [userName, setUserName] = useState<string>('')
    const data = useContext(UserContextStore);
    const navigate = useNavigate()
    const location = useLocation();

  // Extract query params

  useEffect(()=>{
    const checkUser  =async  ()=>{
          const {
              data: { session }
            } = await supabase.auth.getSession();
      
            const user = session?.user;
            if(!user){
              await supabase.auth.signInAnonymously();
            }
    }

  const queryParams = new URLSearchParams(location.search);
  const requestId:string|null = queryParams.get('requestId');
  if(requestId!==null || requestId !== undefined){
    Cookies.set('requestID',requestId || "");
      checkUser()

  }

  },[])



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center justify-center" >
        <h1 className="text-3xl font-black mb-4 text-white tracking-tight">
            What's your insta handle name?
        </h1>
        <Input
        value={userName}
        onChange={(e)=>{setUserName(e.target.value)}}
        placeholder='Enter your name'
        className='w-11/12 border-2 border-purple-500  my-2 mb-6 text-white font-bold py-7 px-8 rounded-3xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-purple-500/30 text-xl relative overflow-hidden group placeholder-transparent'
        size={10}
        />
          <Button 
          onClick={() => {
                data.setUserDetails({...data.userDetails,userName:userName})
                navigate("/age-selector")

          }}
          className="w-11/12  my-2 mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold py-7 px-8 rounded-3xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-purple-500/30 text-xl relative overflow-hidden group"
          size="lg"
        >
            <span className="relative z-10 flex items-center justify-center">
                Next
            </span>
        </Button>
        </div>
    </div>
  )
}

export default UserNameScreen