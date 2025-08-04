import React, { useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const CompareNowButton = ({remaining_attempt}) => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <button
      onClick={()=>{
        if(remaining_attempt>0){
          navigate("/compare")
        }
        else{
          navigate("/valid/pricing-screen")
        }
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      aria-label="Compare Personalities"
      className={`
        group relative overflow-hidden col-span-3
        bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600
        hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500
        text-white font-bold py-4 px-10 rounded-full
        shadow-2xl transition-all duration-300 ease-out
        transform ${isPressed ? 'scale-95' : 'hover:scale-110 hover:-rotate-1'}
        border border-pink-400/30
        text-md
        focus:outline-none focus:ring-2 focus:ring-pink-300
      `}
    >
      {/* Glowing background pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-indigo-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute top-2 left-4 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
        <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-pink-200 rounded-full opacity-0 group-hover:opacity-100 animate-ping animation-delay-200" />
        <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-indigo-200 rounded-full opacity-0 group-hover:opacity-100 animate-ping animation-delay-400" />
      </div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center space-x-3 w-full z-10">
        <Users className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="text-sm font-extrabold tracking-wider uppercase">Compare Personalities</span>
        <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
      </div>
      
      {/* Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
    </button>
  );
};

export default CompareNowButton;