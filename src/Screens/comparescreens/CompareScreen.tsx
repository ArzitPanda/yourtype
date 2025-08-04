import React from 'react';
import { Search, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import BackButton from '../components/BackButton';

const CompareScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 flex items-center justify-center px-4 py-8 sm:p-6 relative overflow-hidden">
      {/* Animated background elements */}
   
      <div className="absolute inset-0 overflow-hidden">
      <div className='ml-6'>
           <BackButton/>
      </div>
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-indigo-500/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        
        {/* Moving gradient lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-indigo-400/30 to-transparent animate-pulse animation-delay-1500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-16 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce animation-delay-500"></div>
        <div className="absolute bottom-32 left-20 w-2.5 h-2.5 bg-indigo-400/40 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-bounce animation-delay-1500"></div>
      </div>

      <div className="w-full max-w-sm sm:max-w-lg md:max-w-4xl relative z-10">
        {/* Header */}
         
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight animate-pulse">
            Vibe Check & Match ✨
          </h1>
          <p className="text-pink-300/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed">
            Find your personality twin and see who's really on your wavelength 💫
          </p>
        </div>

        {/* Action Cards */}
        <div className="flex flex-col space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:space-y-0 max-w-sm sm:max-w-lg md:max-w-3xl mx-auto">
          {/* Search Card */}
          <div
            onClick={() => navigate('/compare/search')}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-pink-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glass morphism card */}
              <div className="relative backdrop-blur-sm bg-pink-900/20 active:bg-pink-900/40 hover:bg-pink-900/30 border border-pink-700/30 hover:border-pink-500/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 transition-all duration-500 group-hover:scale-105 group-active:scale-95 sm:group-hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
                {/* Icon container */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 md:mb-6 group-hover:from-pink-500/30 group-hover:to-pink-600/30 transition-all duration-300 group-hover:rotate-6">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-pink-200 transition-colors duration-300">
                    Hunt for Your Twin 🔍
                  </h3>
                  <p className="text-pink-300/60 group-hover:text-pink-300/80 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                    Stalk profiles (in a cute way), find your personality doppelganger, and discover who's actually built different
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-ping"></div>
                </div>

                {/* Sparkle effects */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute bottom-6 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse animation-delay-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Card */}
          <div
            onClick={() => navigate('/compare/share')}  
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-indigo-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glass morphism card */}
              <div className="relative backdrop-blur-sm bg-indigo-900/20 active:bg-indigo-900/40 hover:bg-indigo-900/30 border border-indigo-700/30 hover:border-indigo-500/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 transition-all duration-500 group-hover:scale-105 group-active:scale-95 sm:group-hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
                {/* Icon container */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 md:mb-6 group-hover:from-indigo-500/30 group-hover:to-indigo-600/30 transition-all duration-300 group-hover:-rotate-6">
                  <Share2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-indigo-200 transition-colors duration-300">
                    Send the Link 📲
                  </h3>
                  <p className="text-indigo-300/60 group-hover:text-indigo-300/80 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                    Create that main character moment - generate links, and see who's really compatible with your energy
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-ping"></div>
                </div>

                {/* Sparkle effects */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute bottom-6 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse animation-delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 rounded-full opacity-50 animate-pulse"></div>
        </div>

        {/* Floating text elements */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-20 text-pink-400 text-xs animate-bounce animation-delay-1000">
          no cap fr fr
        </div>
        <div className="absolute -bottom-8 right-1/4 opacity-20 text-indigo-400 text-xs animate-bounce animation-delay-2000">
          this hits different ✨
        </div>
      </div>
    </div>
  );
};

export default CompareScreen;