// First, install the required dependencies:
// npm install @supabase/supabase-js

import React, { useState, useEffect, useContext } from 'react';
import { User, ShoppingBag, Brain, Star, Award, Calendar, Mail, Target, Heart, TrendingUp, Users, BarChart3, MessageCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Cell } from 'recharts';
import Cookies from 'js-cookie';
import { UserContextStore } from '@/components/context/UserContext';
import { supabase } from '@/components/context/SupabaseContext';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import CompareNowButton from './components/CompareNowButton';

import { data, useNavigate } from 'react-router';
import ProfileTab from './components/dashboard/ProfileTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState(null);
    const [selectedCompatibility, setSelectedCompatibility] = useState(0);
  const quizContext= useContext(UserContextStore);
  const navigate  =useNavigate();
  console.log(quizContext)
useEffect(() => {
  const createUserIfNew = async () => {
    // Check if we have the token in the URL
    const hash = window.location.hash;
    if (!hash.includes('access_token')) return;

    // Parse the access_token, refresh_token, expires_in, etc.
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    const expires_in = params.get('expires_in');

    if (!access_token || !refresh_token || !expires_in) return;

    // Set the session manually
    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (sessionError) {
      console.error('Session set error:', sessionError.message);
      return;
    }

    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) {
      console.error('Get user error:', error?.message);
      return;
    }

    const { id, email, user_metadata } = user;
    const user_id = Cookies.get('user_id'); // Assuming you have it
    console.log('User ID from cookie:', user_id);

  

    const { data: existing, error: fetchError } = await supabase
      .from('authuser')
      .select('user_id')
      .eq('user_id', user_id || 1000000);
   console.log(existing)
    if ((!existing || existing.length === 0) && !fetchError) {
      // Also double-check with email
   
      const { data: authdataCheck } = await supabase
        .from('authuser')
        .select('authuser_id')
        .eq('email', email);

        console.log(authdataCheck)

      if (authdataCheck?.length === 0) {
if (user_id === null || user_id === undefined || user_id === '') {
  const { data: authUserData, error: postgresuserData } = await supabase
    .from('authuser')
    .insert([
      {
        email,
        is_quiz_taken: false,
      },
    ])
    .select('authuser_id') // Make sure we return the authuser_id
    .single();
console.log(data)
  if (error) {
    console.error("Error inserting user:", postgresuserData);
    return;
  }

  // Store values in cookies
  Cookies.set("FIRST_LOGIN_AUTH_USER", "TRUE");
  Cookies.set("AUTHUSER_ID", authUserData?.authuser_id); // store authuser_id

  navigate("/user-name");
  console.log('User inserted in authuser table with ID:', authUserData?.authuser_id);
}
    else{
      console.log(user_id,"else block")
   await supabase.from('authuser').insert([{
          user_id,
          email,
        }]);
        console.log('User inserted in authuser table');
    }
      }

      if(authdataCheck[0].authuser_id!==null  ){
  Cookies.set("FIRST_LOGIN_AUTH_USER", "TRUE");
  Cookies.set("AUTHUSER_ID", authdataCheck[0].authuser_id);
      }


    }

    // Optional: clear hash to clean up the URL
    // window.history.replaceState(null, '', window.location.pathname);
    // window.location.reload();
    
  };

  createUserIfNew();
}, []);
  useEffect(() => {
    fetchUserData();
    fetchUserImage();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get the current user's email from Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        throw new Error('Authentication error: ' + authError.message);
      }
      
      if (!user || !user.email) {
        throw new Error('No authenticated user found or email not available');
      }
      
      // Call your Supabase function with the authenticated user's email
      const { data, error } = await supabase.rpc('get_user_full_summary',
    {  user_email:user.email});

      if (error) {
        throw error;
      }

      // Transform the data to match your component structure
      const transformedData = {
        name: data?.name || '',
        email: data?.email || '',
        username: data?.userdata?.username || 'Unknown',
        age: data?.userdata?.userage || 0,
        zodiacSign: data?.userdata?.zodiac_sign || 'Unknown',
        personalityCode: data?.userdata?.personality_code || 'Unknown',
        isPremium: data?.is_premium || false,
        totalAttempts: data?.total_attempts || 0,
        remainingAttempts: data?.remaining_attempt || 0,
        orders: data?.orders || [],
        similarity_checks:data?.similarity_checks,
        personality: {
          strength: data?.userdata?.response?.strength || '',
          weakness: data?.userdata?.response?.weakness || '',
          elaborate: data?.userdata?.response?.elaborate || '',
          traits: data?.userdata?.personality_type || {}
        }
      };

      setUserData(transformedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserImage = async () => {
    try {
      // Get the current user from Supabase Auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Try different possible image sources from auth metadata
        const avatarUrl = user.user_metadata?.avatar_url || 
                         user.user_metadata?.picture || 
                         user.user_metadata?.avatar ||
                         user.identities?.[0]?.identity_data?.avatar_url ||
                         user.identities?.[0]?.identity_data?.picture;
        
        if (avatarUrl) {
          setUserImage(avatarUrl);
        }
      }
    } catch (err) {
      console.error('Error fetching user image:', err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center">
        <div className="text-center bg-red-900/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20">
          <p className="text-red-300 text-lg mb-4">Error loading dashboard</p>
          <p className="text-red-200 text-sm">{error}</p>
          <button 
            onClick={fetchUserData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Update the ProfileTab component to use the user image
  const CompatibilityTab = () => {
    if (!userData.similarity_checks || userData.similarity_checks.length === 0) {
      return (
        <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
          <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Compatibility Checks Yet</h3>
          <p className="text-purple-300">Your compatibility analysis will appear here</p>
        </div>
      );
    }

    const currentCheck = userData.similarity_checks[selectedCompatibility];
    const { similarity_result, response } = currentCheck;

    // Prepare data for radar chart
    const radarData = similarity_result.common_traits.map(trait => ({
      trait: trait.trait.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim(),
      partner: trait.p1,
      you: trait.p2,
      fullMark: 10
    }));
    

    // Prepare data for compatibility score visualization
    const compatibilityData = userData.similarity_checks.map((check, index) => ({
      match: check?.for_whom,
      score: check?.similarity_result?.compatibility_score * 100,
      color: index === selectedCompatibility ? '#8b5cf6' : '#6366f1'
    }));

    const getRelationshipType = (code) => {
      const types = {
        1: 'Friendship',
        2: 'Professional',
        3: 'Casual',
        4: 'Romantic',
        5: 'Family-like'
      };
      return types[code] || 'Unknown';
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Compatibility Overview */}
        <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Compatibility Analysis</h3>
              
            {userData.similarity_checks.length > 1 && (
              <select 
                value={selectedCompatibility}
                onChange={(e) => setSelectedCompatibility(parseInt(e.target.value))}
                className="bg-purple-900/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white text-sm"
              >
                {userData.similarity_checks.map((check, index) => (
                  <option key={index} value={index}>Match with {check?.for_whom}</option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-900/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(similarity_result?.compatibility_score * 100)}%
              </div>
              <div className="text-purple-300 text-sm">Compatibility Score</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {getRelationshipType(similarity_result.relationship_code)}
              </div>
              <div className="text-purple-300 text-sm">Relationship Type</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {similarity_result.common_traits.length}
              </div>
              <div className="text-purple-300 text-sm">Common Traits</div>
            </div>
          </div>

          {/* Compatibility Scores Bar Chart */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">All Compatibility Scores</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compatibilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="match" stroke="#9CA3AF" />
                  <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {compatibilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Trait Comparison Radar Chart */}
        <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <h4 className="text-lg font-semibold text-white mb-4">Trait Comparison</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis 
                  dataKey="trait" 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  className="capitalize"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 10]} 
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                />
                <Radar
                  name="You"
                  dataKey="you"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Partner"
                  dataKey="partner"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-300 text-sm">You</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-cyan-300 text-sm">Partner</span>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        {response && Object.keys(response).length > 0 && (
          <div className="space-y-4">
            {response.summary && (
              <div className="bg-gradient-to-br from-emerald-800/20 to-teal-800/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-lg font-semibold text-white">Summary</h4>
                </div>
                <p className="text-emerald-100 leading-relaxed">{response.summary}</p>
              </div>
            )}

            {response.common && (
              <div className="bg-gradient-to-br from-blue-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h4 className="text-lg font-semibold text-white">Common Ground</h4>
                </div>
                <p className="text-blue-100 leading-relaxed">{response.common}</p>
              </div>
            )}

            {response.complimentary && (
              <div className="bg-gradient-to-br from-purple-800/20 to-pink-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h4 className="text-lg font-semibold text-white">Complementary Traits</h4>
                </div>
                <p className="text-purple-100 leading-relaxed">{response.complimentary}</p>
              </div>
            )}

            {response.commentary && (
              <div className="bg-gradient-to-br from-amber-800/20 to-orange-800/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  <h4 className="text-lg font-semibold text-white">Commentary</h4>
                </div>
                <p className="text-amber-100 leading-relaxed">{response.commentary}</p>
              </div>
            )}

            {response.conclusion && (
              <div className="bg-gradient-to-br from-rose-800/20 to-red-800/20 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="w-5 h-5 text-rose-400" />
                  <h4 className="text-lg font-semibold text-white">Conclusion</h4>
                </div>
                <p className="text-rose-100 leading-relaxed">{response.conclusion}</p>
              </div>
            )}
          </div>
        )}

        {/* Trait Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Common Traits */}
          <div className="bg-gradient-to-br from-green-800/20 to-emerald-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
            <h4 className="text-lg font-semibold text-white mb-4">Common Traits</h4>
            <div className="space-y-3">
              {similarity_result.common_traits.map((trait, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-green-100 capitalize">
                    {trait.trait.replace(/_/g, ' ')}
                  </span>
                  <div className="flex space-x-2">
                    <span className="text-green-300 text-sm">{trait.p1}</span>
                    <span className="text-green-200">-</span>
                    <span className="text-green-300 text-sm">{trait.p2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complementary Traits */}
          <div className="bg-gradient-to-br from-indigo-800/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/20">
            <h4 className="text-lg font-semibold text-white mb-4">Complementary Traits</h4>
            <div className="space-y-3">
              {similarity_result.complementary_traits.map((trait, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-indigo-100 capitalize">
                    {trait.trait.replace(/_/g, ' ')}
                  </span>
                  <div className="flex space-x-2">
                    <span className="text-indigo-300 text-sm">{trait.p1}</span>
                    <span className="text-indigo-200">⟷</span>
                    <span className="text-indigo-300 text-sm">{trait.p2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const ProfileTab = () => (
  //   <div className="space-y-6 animate-fadeIn">
  //     <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
  //       <div className="flex items-center space-x-4 mb-6">
  //         <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
  //           <User className="w-8 h-8 text-white" />
  //         </div>
  //         <div>
  //           <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
  //           <p className="text-purple-300">@{userData.username}</p>
  //         </div>
  //       </div>
  //       <div className="grid grid-cols-2 gap-4">
  //         <div className="bg-purple-900/30 rounded-xl p-4">
  //           <div className="flex items-center space-x-2 mb-2">
  //             <Mail className="w-5 h-5 text-purple-400" />
  //             <span className="text-purple-300 text-sm">Email</span>
  //           </div>
  //           <p className="text-white text-sm break-all">{userData.email}</p>
  //         </div>
  //         <div className="bg-purple-900/30 rounded-xl p-4">
  //           <div className="flex items-center space-x-2 mb-2">
  //             <Calendar className="w-5 h-5 text-purple-400" />
  //             <span className="text-purple-300 text-sm">Age</span>
  //           </div>
  //           <p className="text-white text-lg font-semibold">{userData.age} years</p>
  //         </div>
  //         <div className="bg-purple-900/30 rounded-xl p-4">
  //           <div className="flex items-center space-x-2 mb-2">
  //             <Star className="w-5 h-5 text-purple-400" />
  //             <span className="text-purple-300 text-sm">Zodiac</span>
  //           </div>
  //           <p className="text-white text-lg font-semibold capitalize">{userData.zodiacSign}</p>
  //         </div>
  //         <div className="bg-purple-900/30 rounded-xl p-4">
  //           <div className="flex items-center space-x-2 mb-2">
  //             <Award className="w-5 h-5 text-purple-400" />
  //             <span className="text-purple-300 text-sm">Status</span>
  //           </div>
  //           <p className="text-white text-lg font-semibold">{userData.remainingAttempts > 0 ? 'Premium' : 'Free'}</p>
  //         </div>
  //       </div>
  //       <div className="mt-6 bg-purple-900/30 rounded-xl p-4">
  //         <div className="flex items-center space-x-2 mb-2">
  //           <Target className="w-5 h-5 text-purple-400" />
  //           <span className="text-purple-300 text-sm">Attempts</span>
  //         </div>
  //         <div className="flex justify-between">
  //           <span className="text-white">Remaining: {userData.remainingAttempts}</span>
  //           <span className="text-white">Total: {userData.totalAttempts}</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const OrdersTab = () => (
    <div className="space-y-4 animate-fadeIn">
      {userData.orders && userData.orders.length > 0 ? (
        userData.orders.map((order, index) => (
          <div key={order.order_id} className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Order #{index + 1}</h3>
                <p className="text-purple-300">Plan ID: {order.plan_id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-300">Attempts</p>
                <p className="text-white font-semibold">
                  {order.remaining_attempt}/{order.total_attempt}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-purple-300">Order ID:</span>
                <span className="text-white text-sm font-mono">
                  {order.order_id.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Date:</span>
                <span className="text-white text-sm">
                  {new Date(order.order_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
          <ShoppingBag className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Orders Yet</h3>
          <p className="text-purple-300">Your order history will appear here</p>
        </div>
      )}
    </div>
  );

  const PersonalityTab = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-4">Personality Type</h3>
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full px-6 py-3">
            <span className="text-2xl font-bold text-white">{userData.personalityCode}</span>
          </div>
          <p className="text-purple-300 mt-2">{userData.personality.elaborate}</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h4 className="text-lg font-semibold text-white mb-4">Strengths</h4>
        <div className="space-y-2">
          {userData.personality.strength.split('•').filter(s => s.trim()).map((strength, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-purple-100 text-sm">{strength.trim()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h4 className="text-lg font-semibold text-white mb-4">Areas for Growth</h4>
        <div className="space-y-2">
          {userData.personality.weakness.split('•').filter(w => w.trim()).map((weakness, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-purple-100 text-sm">{weakness.trim()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TraitsTab = () => {
    const getTraitColor = (value) => {
      if (value >= 7) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      if (value >= 5) return 'bg-gradient-to-r from-amber-500 to-orange-500';
      if (value >= 3) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      return 'bg-gradient-to-r from-purple-500 to-pink-500';
    };

    return (
      <div className="space-y-4 animate-fadeIn">
        {Object.entries(userData.personality.traits).map(([trait, value]) => (
          <div key={trait} className="bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium capitalize">
                {trait.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
              </span>
              <span className="text-purple-300 font-semibold">{value}/10</span>
            </div>
            <div className="w-full bg-purple-900/50 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full ${getTraitColor(value)} transition-all duration-1000 ease-out rounded-full`}
                style={{ width: `${(value / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'personality', label: 'Mytype', icon: Brain },
    { id: 'traits', label: 'Traits', icon: Star },
    { id: 'compatibility', label: 'Compare', icon: Heart }
  ];


  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab userData={userData} />;
      case 'orders': return <OrdersTab />;
      case 'personality': return <PersonalityTab />;
      case 'traits': return <TraitsTab />;
      case 'compatibility' : return <CompatibilityTab/>
      default: return <ProfileTab userData={userData} />;;
    }
  };



  // Don't render if no userData
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-inter">
   
    <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-10 py-8">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">Welcome Back!</h1>
        <p className="text-sm text-zinc-400 tracking-wider">Here’s your personality & order overview</p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6 bg-zinc-800/40 p-2 rounded-2xl">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`relative p-4 rounded-2xl text-sm font-medium transition duration-300 ease-in-out group ${
              activeTab === id
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl scale-105'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mx-auto mb-1 group-hover:scale-110 transition-transform duration-200" />
            {label}
          </button>
        ))}
         <CompareNowButton remaining_attempt={userData.remainingAttempts}  onClick={() => {
        navigate("/compare/search")
    }} />

      </div>

      <div>{renderTabContent()}</div>
    </div>
  </div>

  );
};

export default Dashboard;