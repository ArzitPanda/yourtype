import React, { useState, useEffect } from 'react';
import { Search, User, Loader2, Sparkles, Heart, Zap } from 'lucide-react';
import { supabase } from '@/components/context/SupabaseContext';
import BackButton from '../components/BackButton';

const SearchUserScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Auto-search with 2.5 second delay
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const timeout = setTimeout(() => {
      performSearch(searchQuery);
    }, 2500);

    setSearchTimeout(timeout);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [searchQuery]);

  const performSearch = async (query) => {
    try {
      const { data, error } = await supabase
        .from('userdata')
        .select('user_id, username, name, userage, zodiac_sign, personality_type, personality_code')
        .ilike('username', `%${query}%`)
        .limit(10);

      if (error) {
        console.error('Supabase search error:', error);
        setSearchResults([]);
      } else {
        setSearchResults(data || []);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate DiceBear avatar URL
  const getAvatarUrl = (username) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
  };

  // Get personality emoji
  const getPersonalityEmoji = (code) => {
    const emojiMap = {
      'INTJ': '🧠', 'INTP': '🔬', 'ENTJ': '👑', 'ENTP': '💡',
      'INFJ': '✨', 'INFP': '🎨', 'ENFJ': '🌟', 'ENFP': '🦋',
      'ISTJ': '📚', 'ISFJ': '💝', 'ESTJ': '⚡', 'ESFJ': '🤗',
      'ISTP': '🔧', 'ISFP': '🌸', 'ESTP': '🎯', 'ESFP': '🎉'
    };
    return emojiMap[code] || '✨';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 p-6 relative overflow-hidden">
      {/* Animated background elements */}
     
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-2 mb-3">
            <Search className="w-6 h-6 text-pink-400 animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Hunt Your Twin 🔍
            </h1>
          </div>
          <p className="text-pink-300/80 text-base mb-4">
            Find your personality doppelganger and see who's actually built different ✨
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <div className="flex items-center space-x-1.5 bg-pink-900/30 backdrop-blur-sm border border-pink-500/30 rounded-full px-3 py-1.5">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-pink-300 text-xs">Personality Match</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-purple-300 text-xs">Instant Search</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/30 rounded-full px-3 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-300 text-xs">Real Vibes</span>
            </div>
          </div>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-pink-400" />
          </div>
          <input
            type="text"
            placeholder="Search by username... find your twin bestie ✨"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-pink-900/20 backdrop-blur-sm border border-pink-500/30 rounded-xl text-white placeholder-pink-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300"
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Loader2 className="h-5 w-5 text-pink-400 animate-spin" />
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="space-y-3">
          {searchResults.length > 0 && (
            <div className="text-center mb-4">
              <p className="text-pink-300/80 text-sm">
                Found {searchResults.length} potential twin{searchResults.length !== 1 ? 's' : ''} 💫
              </p>
            </div>
          )}
          
          {searchResults.map((user) => (
            <div
              key={user.user_id}
              className="group bg-pink-900/20 backdrop-blur-sm border border-pink-500/30 hover:border-pink-400/50 rounded-xl p-4 hover:bg-pink-900/30 transition-all duration-300 cursor-pointer transform hover:scale-102 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/10"
            >
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-0.5">
                    <img
                      src={getAvatarUrl(user.username)}
                      alt={user.name}
                      className="w-full h-full rounded-full bg-pink-800/30"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-pink-900 animate-pulse"></div>
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-semibold text-lg truncate group-hover:text-pink-200 transition-colors duration-300">
                      {user.name}
                    </h3>
                    <Sparkles className="w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                  </div>
                  
                  <p className="text-pink-300/80 text-sm mb-2">
                    @{user.username}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs bg-pink-800/40 text-pink-300 px-2 py-1 rounded-full border border-pink-500/30">
                      {user.userage} years old
                    </span>
                    
                    <span className="text-xs bg-purple-800/40 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">
                      {user.zodiac_sign} ♈
                    </span>
                    
                    {user.personality_code && (
                      <span className="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                        <span>{getPersonalityEmoji(user.personality_code)}</span>
                        <span>{user.personality_code}</span>
                      </span>
                    )}
                  </div>

                  {/* Compatibility hint */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-pink-300/60 text-xs">
                      Click to see if y'all are compatible bestie ✨
                    </p>
                  </div>
                </div>
                
                {/* Action indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          ))}
          
          {searchQuery && !isLoading && searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-pink-900/20 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6 max-w-sm mx-auto">
                <User className="mx-auto h-12 w-12 text-pink-400/60 mb-4" />
                <h3 className="text-pink-300 text-lg font-medium mb-2">
                  No twins found bestie 😔
                </h3>
                <p className="text-pink-300/60 text-sm mb-2">
                  Couldn't find anyone matching "{searchQuery}"
                </p>
                <p className="text-pink-300/40 text-xs">
                  Try a different username ✨
                </p>
              </div>
            </div>
          )}

          {!searchQuery && (
            <div className="text-center py-12">
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 max-w-sm mx-auto">
                <Search className="mx-auto h-12 w-12 text-purple-400/60 mb-4" />
                <h3 className="text-purple-300 text-lg font-medium mb-2">
                  Ready to find your twin? ✨
                </h3>
                <p className="text-purple-300/60 text-sm">
                  Start typing a username bestie 💫
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom floating text */}
        <div className="text-center mt-6 opacity-60">
          <p className="text-pink-300/60 text-xs">
            about to discover some real personality tea fr fr ☕✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchUserScreen;