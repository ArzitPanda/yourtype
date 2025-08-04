import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Star, 
  Award, 
  Target, 
  Edit3, 
  Settings, 
  Crown,
  TrendingUp,
  Clock,
  Shield,
  Camera,
  ChevronRight,
  Activity
} from 'lucide-react';

const ProfileTab = ({ userData }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const getZodiacEmoji = (sign) => {
    const zodiacEmojis = {
      aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
      leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
      sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
    };
    return zodiacEmojis[sign?.toLowerCase()] || '⭐';
  };

  const calculateUsedAttempts = () => {
    return userData?.totalAttempts ? userData.totalAttempts - userData.remainingAttempts : 0;
  };

  const calculateSuccessRate = () => {
    const used = calculateUsedAttempts();
    return used > 0 ? Math.round((used / userData.totalAttempts) * 100) : 0;
  };

  const stats = [
    { 
      label: "Used", 
      value: calculateUsedAttempts(), 
      icon: TrendingUp, 
      color: "from-emerald-500 to-teal-500",
      bg: "from-emerald-500/20 to-teal-500/20"
    },
    { 
      label: "Remaining", 
      value: userData?.remainingAttempts || 0, 
      icon: Target, 
      color: "from-blue-500 to-cyan-500",
      bg: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      label: "Total", 
      value: userData?.totalAttempts || 0, 
      icon: Activity, 
      color: "from-purple-500 to-indigo-500",
      bg: "from-purple-500/20 to-indigo-500/20"
    },
    { 
      label: "Success Rate", 
      value: `${calculateSuccessRate()}%`, 
      icon: Award, 
      color: "from-yellow-500 to-orange-500",
      bg: "from-yellow-500/20 to-orange-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm  p-3 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Profile Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
            }}></div>
          </div>
          
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              
              {/* Avatar Section */}
              <div className="relative group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-purple-400/30 group-hover:ring-purple-400/50 transition-all duration-300">
                  <User className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 border-2 sm:border-4 border-purple-900">
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {userData?.name || 'User Name'}
                    </h1>
                    <p className="text-purple-300 text-sm sm:text-base mb-2">
                      @{userData?.username || 'username'}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <div className="flex items-center space-x-1 bg-purple-700/50 px-3 py-1 rounded-full">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white font-medium">
                          {userData?.remainingAttempts > 0 ? 'Premium' : 'Free'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 sm:mt-0">
                    <button className="p-2 sm:p-3 bg-purple-600/50 hover:bg-purple-600/70 rounded-xl transition-colors duration-200 backdrop-blur-sm">
                      <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </button>
                    <button className="p-2 sm:p-3 bg-purple-600/50 hover:bg-purple-600/70 rounded-xl transition-colors duration-200 backdrop-blur-sm">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-purple-300 text-xs sm:text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personal Information Cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Contact Info</h3>
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            
            <div className="space-y-4">
              <div className="group p-3 sm:p-4 bg-purple-900/30 hover:bg-purple-900/50 rounded-xl transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-purple-300 text-xs sm:text-sm">Email Address</p>
                    <p className="text-white text-sm sm:text-base font-medium truncate">
                      {userData?.email || 'email@example.com'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Personal</h3>
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            
            <div className="space-y-4">
              <div className="group p-3 sm:p-4 bg-purple-900/30 hover:bg-purple-900/50 rounded-xl transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-purple-300 text-xs sm:text-sm">Age</p>
                    <p className="text-white text-sm sm:text-base font-medium">
                      {userData?.age || '25'} years
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group p-3 sm:p-4 bg-purple-900/30 hover:bg-purple-900/50 rounded-xl transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-lg">
                    {getZodiacEmoji(userData?.zodiacSign)}
                  </div>
                  <div className="flex-1">
                    <p className="text-purple-300 text-xs sm:text-sm">Zodiac Sign</p>
                    <p className="text-white text-sm sm:text-base font-medium capitalize">
                      {userData?.zodiacSign || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Overview */}
        <div className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-500/20 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white">Usage Overview</h3>
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-purple-900/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Attempts Remaining</p>
                  <p className="text-purple-300 text-xs sm:text-sm">Available uses</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold text-white">{userData?.remainingAttempts || 0}</p>
                <p className="text-purple-300 text-xs sm:text-sm">of {userData?.totalAttempts || 0}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-300">Usage Progress</span>
                <span className="text-white">{calculateSuccessRate()}%</span>
              </div>
              <div className="w-full bg-purple-900/50 rounded-full h-2 sm:h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(calculateSuccessRate(), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;