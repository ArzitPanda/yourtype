import React from 'react';
import { Search, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const CompareScreen = () => {
const navigate  = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-lg md:max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
            Compare & Connect 
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed">
            Discover compartibility with whom you want
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glass morphism card */}
              <div className="relative backdrop-blur-sm bg-slate-800/60 active:bg-slate-800/80 hover:bg-slate-800/80 border border-slate-700/50 hover:border-purple-500/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 transition-all duration-500 group-hover:scale-105 group-active:scale-95 sm:group-hover:-translate-y-2">
                {/* Icon container */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 md:mb-6 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
                    Search Users
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                    Find and compare profiles, discover similar interests, and explore user connections across the platform
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse"></div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-cyan-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glass morphism card */}
              <div className="relative backdrop-blur-sm bg-slate-800/60 active:bg-slate-800/80 hover:bg-slate-800/80 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 transition-all duration-500 group-hover:scale-105 group-active:scale-95 sm:group-hover:-translate-y-2">
                {/* Icon container */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 md:mb-6 group-hover:from-cyan-500/30 group-hover:to-cyan-600/30 transition-all duration-300">
                  <Share2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors duration-300">
                    Create Link
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                    Generate shareable comparison links, invite others to compare, and collaborate on insights together
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CompareScreen;