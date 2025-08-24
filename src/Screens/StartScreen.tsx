import React, { useState } from 'react';
import { ChevronRight, Share2, Sparkles, Heart, ArrowLeft, Instagram, Copy, Zap, Brain, Star, Flame, Users, Target, Palette, Music, Coffee, Phone, X, Mail, Lock, Apple, Eye, EyeOff, Crown, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router';
import { supabase } from '@/components/context/SupabaseContext';

const StartScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);

  const navigate = useNavigate();

  // Auto-show modal after 1 second




  React.useEffect(() => {
    const showModalTimer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(showModalTimer);
  }, []);

  // Show cancel button after 3 seconds of modal being open
  React.useEffect(() => {
    let cancelButtonTimer;
    if (showModal) {
      cancelButtonTimer = setTimeout(() => {
        setShowCancelButton(true);
      }, 3000);
    } else {
      setShowCancelButton(false);
    }

    return () => clearTimeout(cancelButtonTimer);
  }, [showModal]);

  const closeModal =async () => {
    setShowModal(false);
    setShowCancelButton(false);
    


  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-1000"></div>
      </div>
      
      <div className="max-w-lg w-full text-center relative z-10">
        <div className="mb-8">
          {/* Enhanced Logo */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/40 transform hover:rotate-6 transition-all duration-700 hover:scale-110">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl flex items-center justify-center">
                <Brain className="w-9 h-9 text-purple-300" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center animate-bounce delay-500">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-black mb-4 text-white tracking-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Digital Soul ✨
            </span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">
            The most <span className="text-purple-400 font-bold">addictive</span> personality test that actually<br />
            <span className="text-pink-400 font-semibold">gets you</span> — in just 90 seconds 🔥
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="space-y-4 mb-8">
          <Button 
            onClick={async () =>{
              
            await  supabase.auth.signInAnonymously()
              navigate("/user-name")}}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold py-8 px-8 rounded-3xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-purple-500/40 text-xl relative overflow-hidden group"
            size="lg"
          >
            <span className="relative z-10 flex items-center justify-center">
              Start Your Journey
              <Zap className="w-6 h-6 ml-2 group-hover:animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Button>
          
          <div className="text-sm text-slate-400 font-medium">
            🎯 Join <span className="text-purple-400 font-bold">2.3M+</span> people who discovered their true self
          </div>
        </div>
        
        {/* Enhanced Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-slate-300">
          <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">90 sec test</span>
          </div>
          <div className="bg-pink-900/40 backdrop-blur-sm border border-pink-500/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Target className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium">99% accurate</span>
          </div>
          <div className="bg-cyan-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">Viral worthy</span>
          </div>
        </div>
        
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-500/40 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-black text-white">16</div>
              <div className="text-xs text-purple-200 font-medium">Personality Types</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-900/50 to-rose-800/50 border-pink-500/40 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-black text-white">2.3M</div>
              <div className="text-xs text-pink-200 font-medium">Happy Users</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-800/50 border-cyan-500/40 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-black text-white">4.9</div>
              <div className="text-xs text-cyan-200 font-medium">Star Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center text-slate-400 text-sm">
          <p className="mb-2">✨ Featured on TikTok, Instagram & YouTube</p>
          <p>🔥 Trending #1 personality test worldwide</p>
        </div>
      </div>

      {/* Modal with Enhanced Animations and Google-only Sign-in */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in slide-in-from-bottom-8 zoom-in-95 duration-700">
            {/* Close Button - Only show after 3 seconds */}
            {showCancelButton && (
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-slate-800/70 hover:bg-slate-700/70 text-slate-300 hover:text-white rounded-full p-3 z-20 animate-in fade-in slide-in-from-top-2 duration-300 transition-all duration-200 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 animate-pulse"></div>

            {/* Modal Content */}
            <div className="p-8 relative z-10">
              {/* Header with Animation */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center animate-in zoom-in-50 duration-500 delay-300">
                  <Crown className="w-8 h-8 text-white animate-bounce" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                  Unlock Your <span className="text-purple-400">Full Potential</span>
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed animate-in slide-in-from-bottom-4 duration-500 delay-700">
                  Sign in to unlock premium features and get your complete personality breakdown.
                </p>
              </div>

              {/* Premium Features with Staggered Animation */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-4 mb-6 animate-in slide-in-from-left-4 duration-500 delay-1000">
                <div className="flex items-center mb-3">
                  <Gift className="w-5 h-5 text-yellow-400 mr-2 animate-bounce" />
                  <span className="text-yellow-400 font-bold text-sm">EXCLUSIVE FEATURES</span>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center animate-in slide-in-from-left-2 duration-300 delay-1200">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                    <span>Compare with your crush's personality 💕</span>
                  </div>
                  <div className="flex items-center animate-in slide-in-from-left-2 duration-300 delay-1400">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse delay-200"></div>
                    <span>See if they're really into you 🔥</span>
                  </div>
                  <div className="flex items-center animate-in slide-in-from-left-2 duration-300 delay-1600">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse delay-400"></div>
                    <span>Get your compatibility score ⚡</span>
                  </div>
                </div>
              </div>
              
              {/* Google Sign-In Button as Primary CTA */}
              <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500 delay-1800">
                 <Button className="w-full bg-white text-slate-800 font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10"
                
                onClick={()=>{navigate("/login",{state:{instant:true}})}}
                 
                 >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
              </div>

              <div className="text-center mt-6 text-xs text-slate-400 animate-in fade-in duration-500 delay-2000">
                By continuing, you agree to our <a href="#" className="underline hover:text-white">Terms</a> & <a href="#" className="underline hover:text-white">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
