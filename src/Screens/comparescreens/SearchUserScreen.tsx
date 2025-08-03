import React, { useState, useEffect } from 'react';
import { Search, User, Loader2 } from 'lucide-react';
import { supabase } from '@/components/context/SupabaseContext';

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

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Search Users</h1>
        
        {/* Search Input */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="space-y-3">
          {searchResults.length > 0 && (
            <p className="text-gray-400 text-sm mb-4">
              Found {searchResults.length} user{searchResults.length !== 1 ? 's' : ''}
            </p>
          )}
          
          {searchResults.map((user) => (
            <div
              key={user.user_id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={getAvatarUrl(user.username)}
                    alt={user.name}
                    className="w-12 h-12 rounded-full bg-gray-700"
                  />
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg truncate">
                    {user.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    @{user.username}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Age: {user.userage}
                    </span>
                    <span className="text-xs text-gray-500">
                      {user.zodiac_sign}
                    </span>
                    {user.personality_code && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                        {user.personality_code}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* User ID */}
                <div className="text-gray-500 text-sm">
                  ID: {user.user_id}
                </div>
              </div>
            </div>
          ))}
          
          {searchQuery && !isLoading && searchResults.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400">No users found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUserScreen;