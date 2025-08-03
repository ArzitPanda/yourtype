import React, { useState, useEffect, useRef, useContext } from 'react';
import { Instagram, Copy, Download, Share2 } from 'lucide-react';
// import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import { UserContextStore } from '@/components/context/UserContext';
import { useNavigate } from 'react-router';

// Mock character data


const PersonalityResults = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<any>(null);
  const cardRef = useRef(null);
  const quizContext = useContext(UserContextStore);
  const userDetails = quizContext?.userDetails || {};
  const navigate =useNavigate();
  
  const characterData = {
    name: userDetails?.userName || "Luna Vibes",
    age: userDetails?.userage || 24,
    personalityType: userDetails?.personality?.elaborate?.split(' - ')[0] || "Main Character Energy",
    mbtiType: userDetails?.personality?.personality_code || "ENFP-A",
    character: "✨",
    aesthetic: "cosmic princess",
    strengths: userDetails?.personality?.strength
      ? userDetails.personality.strength.split('•').filter(Boolean).map(s => s.trim())
      : [
          "literally manifests dreams into reality",
          "gives the best advice at 3am",
          "turns awkward moments into iconic ones"
        ],
    weaknesses: userDetails?.personality?.weakness
      ? userDetails.personality.weakness.split('•').filter(Boolean).map(w => w.trim())
      : [
          "overthinks literally everything", 
          "chronically online but make it cute",
          "says 'i'm fine' but needs 47 hugs"
        ],
    vibe: "that friend who always knows the perfect playlist",
    seed: userDetails?.userName || "Luna"
  };
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);



  // html2canvas functionality (would normally be imported)


const handleInstagramShare = async () => {
  if (!cardRef.current) return;
  setIsCapturing(true);
  

  try {
    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      backgroundColor: '#1e1b4b' // fallback background if transparent
    });

    const link = document.createElement('a');
    link.download = 'my-personality-card.png';
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Image download failed:', error);
    alert('Oops! Something went wrong while saving 😢');
  } finally {
    setIsCapturing(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      {/* Bento Grid Container - This is what gets captured */}
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className={`text-center mb-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <h1 className="text-xl font-bold text-white mb-2">your cosmic identity</h1>
          <p className="text-white/60 text-sm">just dropped and it's giving ✨</p>
        </div>

        {/* Bento Grid */}
        <div ref={cardRef} className='p-2 '>
        <div className={`grid grid-cols-6 gap-3 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          {/* Character Card - Large */}
          <div className="col-span-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 text-2xl opacity-20">✨</div>
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${characterData.seed}&backgroundColor=transparent&clothesColor=262e33,65c9ff,5199e4,25557c&eyebrowType=raised,unibrow,up&eyeType=happy,hearts,side,squint,surprised,wink&facialHairType=blank,mustache&hairColor=724133,d6b370,f59797,65c9ff,796a45&hatColor=d6b370,ff488e&mouthType=concerned,default,disbelief,eating,grimace,sad,screamOpen,serious,smile,tongue,twinkle,vomit&skinColor=ae5d29,ddb2a5,fd9841,fdbcb4&topType=longHair,shortHair,hat,hijab,turban`}
                  alt="avatar"
                  className="w-20 h-20 rounded-2xl bg-white/20 p-1"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-1">{characterData.name}</h2>
                <p className="text-white/80 text-sm mb-2">{characterData.age} • {characterData.aesthetic}</p>
                
                {/* MBTI Badge */}
                <div className="bg-white/20 px-3 py-1 rounded-full inline-block mb-2">
                  <p className="text-white text-xs font-medium">{characterData.mbtiType}</p>
                </div>
                
                {/* Personality Type */}
                <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 px-3 py-1 rounded-full inline-block">
                  <p className="text-white text-xs font-medium">{characterData.personalityType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vibe Check - Medium */}
          <div className="col-span-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 text-black">
            <div className="text-2xl mb-2">💅</div>
            <h3 className="font-bold text-sm mb-1">vibe check</h3>
            <p className="text-xs leading-relaxed">{characterData.vibe}</p>
          </div>

          {/* Age Badge - Small */}
          <div className="col-span-2 bg-slate-800 rounded-2xl p-4 text-white flex flex-col justify-center items-center">
            <div className="text-2xl font-bold">{characterData.age}</div>
            <div className="text-xs text-white/60">years iconic</div>
          </div>

          {/* Strengths - Large */}
          <div className="col-span-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-4 border border-green-500/20">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white text-xs">✓</span>
              </div>
              <h3 className="font-bold text-white text-sm">literally serving</h3>
            </div>
            <div className="space-y-2">
              {characterData.strengths.map((strength, index) => (
                <div key={index} className="text-white/90 text-xs leading-relaxed">
                  • {strength}
                </div>
              ))}
            </div>
          </div>

          {/* Growth Areas - Medium */}
          <div className="col-span-4 bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-4 border border-orange-500/20">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white text-xs">~</span>
              </div>
              <h3 className="font-bold text-white text-sm">it's the _ for me</h3>
            </div>
            <div className="space-y-1">
              {characterData.weaknesses.slice(0, 2).map((weakness, index) => (
                <div key={index} className="text-white/90 text-xs leading-relaxed">
                  • {weakness}
                </div>
              ))}
            </div>
          </div>

          {/* Emoji - Small */}
          <div className="col-span-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">🦋</span>
          </div>
         </div>
         </div>
          {/* Instagram Share - Large */}
          <div className="col-span-6 my-2">
            <button
              onClick={handleInstagramShare}
              disabled={isCapturing}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {isCapturing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                  <span className="relative z-10">creating your card...</span>
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Flaunt your personality</span>
                  <span className="text-lg relative z-10">✨</span>
                </>
              )}
            </button>
          </div>
          <div className="col-span-6 my-4">
  <button
    onClick={()=>{
      navigate("/login")
    }}
    className="relative w-full py-5 px-8 rounded-[2rem] bg-black text-yellow-300 font-extrabold text-lg tracking-wide shadow-[0_0_20px_rgba(255,215,0,0.6)] overflow-hidden group transition-transform transform hover:scale-[1.05] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)]"
  >
    {/* Glowing border ring */}
    <span className="absolute inset-0 rounded-[2rem] border-4 border-yellow-400 opacity-20 blur-xl animate-pulse pointer-events-none"></span>

    {/* Animated gold shimmer sweep */}
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>

    {/* Text and Icon Layer */}
    <div className="relative z-10 flex items-center justify-center space-x-4">
      <Share2 className="w-6 h-6 text-yellow-300" />
      <span className="uppercase">Check Compatibility</span>
      <span className="text-2xl">💫</span>
    </div>
  </button>
</div>


          {/* Copy Text - Medium */}
       

          {/* Save Card - Medium */}
         

          {/* Retake Quiz - Full Width */}
          <div className="col-span-6 text-center pt-2">
            <button 
              onClick={() => window.location.reload()}
              className="text-purple-300 text-sm hover:text-purple-200 transition-colors underline"
            >
              take again bestie
            </button>
          </div>

  

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/40 text-xs">periodt. you understood the assignment ✨</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalityResults;