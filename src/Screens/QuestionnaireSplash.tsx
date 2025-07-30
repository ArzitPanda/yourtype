import React from 'react';
import { Shield, ArrowRight, Stars, Sparkles, Zap, Coffee } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router';

export default function QuestionnaireSplash() {
    const navigate =useNavigate();
  const handleStart = () => {
    // Add your navigation logic here
    console.log('Starting questionnaire...');
    navigate("/question-answer")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      
      {/* Same background elements as zodiac selector */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-16 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-80"></div>
        <div className="absolute top-60 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-40 right-8 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-60 left-12 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md text-center">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Stars className="w-6 h-6 text-purple-300" />
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-3">
              Time to Spill the Tea ☕
            </h1>
            <p className="text-white/70 text-sm">Your cosmic personality is about to be exposed</p>
          </div>

          {/* Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <Coffee className="w-10 h-10 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"></div>
            </div>
          </div>

          {/* Content Cards using shadcn Alert */}
          <div className="space-y-4 mb-8">
          <button 
              onClick={handleStart}
              className="bg-gradient-to-r w-10/12 mx-auto  from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Let's Start this</span>
              <ArrowRight className="w-5 h-5" />
            </button>
           
          </div>

          {/* Centered Start Button */}
          <div className="flex flex-col items-center space-y-4">
           
          <Alert className="bg-white/10 backdrop-blur-sm border-purple-300/30 text-white">
              <Zap className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-white/90">
                We're gonna hit you with <span className="font-bold text-purple-300">8-9 questions</span> 
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-white/10 backdrop-blur-sm border-pink-300/30 text-white">
              <Stars className="h-4 w-4 text-pink-400" />
              <AlertDescription className="text-white/90">
                Just be <span className="font-bold text-pink-300">brutally honest</span>
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-white/10 backdrop-blur-sm border-green-300/30 text-white">
              <Shield className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-white/90">
                Your secrets are <span className="font-bold text-green-300">safer than your DMs</span>
              </AlertDescription>
            </Alert>
            
            <p className="text-white/40 text-xs">
              (probably like 2-3 mins if you're not overthinking it)
            </p>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx="true">{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}