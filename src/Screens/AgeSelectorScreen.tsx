import { useContext, useState } from 'react';
import { UserContextStore } from '@/components/context/UserContext';
import { useNavigate } from 'react-router';

const AgeSelectorScreen = () => {
  const { userDetails, setUserDetails } = useContext(UserContextStore);
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState<number>(userDetails?.userage || 24);

  const handleNext = () => {
    try {
      setUserDetails({ ...userDetails, userage: selectedAge });
      console.log("Age selected:", selectedAge);
      navigate('/zodiac-seletor');
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const ageRanges = [
    { label: "16-20", range: [16, 17, 18, 19, 20] },
    { label: "21-25", range: [21, 22, 23, 24, 25] },
    { label: "26-30", range: [26, 27, 28, 29, 30] },
    { label: "31-35", range: [31, 32, 33, 34, 35] },
    { label: "36-40", range: [36, 37, 38, 39, 40] },
    { label: "41+", range: [41, 42, 43] }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 mb-6 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full backdrop-blur-sm border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎂</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent mb-4">
            What's Your Age?
          </h1>
          <p className="text-gray-400 text-lg">Help us personalize your experience</p>
        </div>

        {/* Age Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-md">
          {ageRanges.map((ageGroup) => (
            <div key={ageGroup.label} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 text-center">{ageGroup.label}</h3>
              <div className="grid grid-cols-5 gap-1">
                {ageGroup.range.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`aspect-square rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-110 ${
                      selectedAge === age
                        ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 scale-110'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Age Display */}
        <div className="mb-8 p-6 bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-2xl backdrop-blur-sm border border-white/10">
          <p className="text-gray-400 text-sm text-center mb-2">Selected Age</p>
          <div className="text-4xl font-bold text-center bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {selectedAge}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleNext}
          type="button"
          className="group relative w-full max-w-md h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <span>Continue</span>
            <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </div>
          </div>
        </button>

        {/* Progress Indicator */}
        <div className="mt-8 flex space-x-2">
          <div className="w-8 h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full" />
          <div className="w-8 h-1 bg-white/20 rounded-full" />
          <div className="w-8 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AgeSelectorScreen;