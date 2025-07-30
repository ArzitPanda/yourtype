import React, { useState } from 'react';
import { ChevronRight, Share2, Sparkles, Heart, ArrowLeft, Instagram, Copy, Zap, Brain, Star, Flame, Users, Target, Palette, Music, Coffee, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router';








const StartScreen = () => {
  

  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-8">
          {/* Modern Logo/Icon */}
          <div className="relative mb-8">
            <div className="w-18  h-18 mx-auto bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-14 h-14  bg-slate-900 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-black mb-4 text-white tracking-tight">
            What's Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Type!
            </span>
          </h1>
          <p className="text-md  text-slate-300 mb-8 leading-relaxed font-light">
            Unlock your digital personality with our<br />
            <span className="text-purple-400 font-semibold">next-gen</span> personality test
          </p>
        </div>

        <Button 
          onClick={() => {
            navigate('/user-name')
          }}
          className="w-11/12  my-2 mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold py-7 px-8 rounded-3xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-purple-500/30 text-xl relative overflow-hidden group"
          size="lg"
        >
          <span className="relative z-10 flex items-center justify-center">
            Discover Your Type
            <Zap className="w-6 h-6 ml-2 group-hover:animate-bounce" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </Button>
        <div className="flex items-center justify-center mt-6 mb-6 space-x-4 text-slate-400">
          <span className="text-sm">⚡ 90 seconds</span>
          <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
          <span className="text-sm">🎯 Hyper-accurate</span>
          <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
          <span className="text-sm">🚀 Shareable</span>
        </div>
        
        {/* Modern Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8 w-11/12 mx-auto">
          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="w-10  h-10  mx-auto mb-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-xs text-purple-200">Questions</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-800/40 border-cyan-500/30 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">16</div>
              <div className="text-xs text-cyan-200">Types</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-900/40 to-rose-800/40 border-pink-500/30 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-xs text-pink-200">Shares</div>
            </CardContent>
          </Card>
        </div>

        
      
      </div>
    </div>
  )
};


  export default StartScreen;