import React, { useState, useRef, useEffect, useContext } from 'react';
import { ChevronLeft, Stars, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { UserContextStore } from '@/components/context/UserContext';

const zodiacSigns = [
  { 
    id: 'aries', 
    name: 'Aries', 
    symbol: '♈', 
    trait: 'Bold & Adventurous',
    element: 'Fire',
    gradient: 'from-red-500 to-orange-500'
  },
  { 
    id: 'taurus', 
    name: 'Taurus', 
    symbol: '♉', 
    trait: 'Reliable & Patient',
    element: 'Earth',
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'gemini', 
    name: 'Gemini', 
    symbol: '♊', 
    trait: 'Curious & Adaptable',
    element: 'Air',
    gradient: 'from-yellow-400 to-amber-500'
  },
  { 
    id: 'cancer', 
    name: 'Cancer', 
    symbol: '♋', 
    trait: 'Nurturing & Intuitive',
    element: 'Water',
    gradient: 'from-blue-400 to-cyan-500'
  },
  { 
    id: 'leo', 
    name: 'Leo', 
    symbol: '♌', 
    trait: 'Confident & Generous',
    element: 'Fire',
    gradient: 'from-orange-500 to-red-500'
  },
  { 
    id: 'virgo', 
    name: 'Virgo', 
    symbol: '♍', 
    trait: 'Practical & Analytical',
    element: 'Earth',
    gradient: 'from-teal-500 to-green-500'
  },
  { 
    id: 'libra', 
    name: 'Libra', 
    symbol: '♎', 
    trait: 'Balanced & Charming',
    element: 'Air',
    gradient: 'from-pink-500 to-rose-500'
  },
  { 
    id: 'scorpio', 
    name: 'Scorpio', 
    symbol: '♏', 
    trait: 'Intense & Passionate',
    element: 'Water',
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 'sagittarius', 
    name: 'Sagittarius', 
    symbol: '♐', 
    trait: 'Optimistic & Free-spirited',
    element: 'Fire',
    gradient: 'from-violet-500 to-purple-500'
  },
  { 
    id: 'capricorn', 
    name: 'Capricorn', 
    symbol: '♑', 
    trait: 'Ambitious & Disciplined',
    element: 'Earth',
    gradient: 'from-slate-600 to-gray-700'
  },
  { 
    id: 'aquarius', 
    name: 'Aquarius', 
    symbol: '♒', 
    trait: 'Independent & Innovative',
    element: 'Air',
    gradient: 'from-sky-500 to-blue-500'
  },
  { 
    id: 'pisces', 
    name: 'Pisces', 
    symbol: '♓', 
    trait: 'Compassionate & Artistic',
    element: 'Water',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

export default function ZodiacSelector() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSign, setSelectedSign] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
    velocity: 0
  });
  const data = useContext(UserContextStore);
  const navigate = useNavigate()
  console.log(selectedSign)
  const containerRef = useRef(null);
  const lastTimeRef = useRef(Date.now());
  const lastPositionRef = useRef(0);

  // Touch/Mouse handlers for smooth swiping
  const handleStart = (clientX:any) => {
    const time = Date.now();
    setDragState(prev => ({
      ...prev,
      isDragging: true,
      startX: clientX,
      currentX: clientX,
      velocity: 0
    }));
    lastTimeRef.current = time;
    lastPositionRef.current = clientX;
  };

  const handleMove = (clientX:any) => {
    if (!dragState.isDragging) return;

    const time = Date.now();
    const timeDiff = time - lastTimeRef.current;
    const positionDiff = clientX - lastPositionRef.current;
    const velocity = timeDiff > 0 ? positionDiff / timeDiff : 0;

    setDragState(prev => ({
      ...prev,
      currentX: clientX,
      velocity: velocity
    }));

    lastTimeRef.current = time;
    lastPositionRef.current = clientX;
  };

  const handleEnd = () => {
    if (!dragState.isDragging) return;

    const deltaX = dragState.currentX - dragState.startX;
    const threshold = 80;
    const velocityThreshold = 0.5;

    setIsTransitioning(true);

    if (Math.abs(deltaX) > threshold || Math.abs(dragState.velocity) > velocityThreshold) {
      if (deltaX > 0 || dragState.velocity > velocityThreshold) {
        // Swipe right - previous card
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else {
        // Swipe left - next card
        setCurrentIndex(prev => Math.min(zodiacSigns.length - 1, prev + 1));
      }
    }

    setDragState({
      isDragging: false,
      startX: 0,
      currentX: 0,
      velocity: 0
    });

    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Mouse events
  const handleMouseDown = (e:any) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e:any) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = (e:any) => {
    e.preventDefault();
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e:any) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e:any) => {
 
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add global mouse events when dragging
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging]);

  const getCardTransform = (index:any) => {
    const diff = index - currentIndex;
    const dragOffset = dragState.isDragging ? (dragState.currentX - dragState.startX) * 0.8 : 0;
    
    if (diff === 0) {
      // Center card
      return {
        transform: `translateX(calc(-50% + ${dragOffset}px)) scale(1)`,
        opacity: 1,
        zIndex: 10
      };
    } else if (diff === -1) {
      // Previous card (left)
      return {
        transform: `translateX(calc(-50% - 280px + ${dragOffset}px)) scale(0.9)`,
        opacity: 0.7,
        zIndex: 5
      };
    } else if (diff === 1) {
      // Next card (right)
      return {
        transform: `translateX(calc(-50% + 280px + ${dragOffset}px)) scale(0.9)`,
        opacity: 0.7,
        zIndex: 5
      };
    } else {
      // Hidden cards
      return {
        transform: `translateX(calc(-50% + ${diff * 300 + dragOffset}px)) scale(0.8)`,
        opacity: 0,
        zIndex: 1
      };
    }
  };

  const handleCardSelect = () => {
    setSelectedSign(zodiacSigns[currentIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden select-none">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-16 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-80"></div>
        <div className="absolute top-60 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-40 right-8 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-60 left-12 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 pt-12">
        <div className="flex items-center justify-between mb-2">
          <ChevronLeft className="w-6 h-6 text-white/70" />
          <div className="flex items-center space-x-2">
            <Stars className="w-5 h-5 text-purple-300" />
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Choose Your Sign
          </h1>
          <p className="text-white/70 text-sm">Swipe to explore the zodiac</p>
        </div>
      </div>

      {/* Card Swiper Container */}
      <div 
        ref={containerRef}
        className="relative h-96 flex items-center justify-center mt-12 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {zodiacSigns.map((sign, index) => {
          const cardStyle = getCardTransform(index);
          
          return (
            <div
              key={sign.id}
              className={`
                absolute w-64 h-80 left-1/2 transition-all duration-300 ease-out
                ${!dragState.isDragging && !isTransitioning ? 'transition-all duration-500 ease-out' : ''}
              `}
              style={cardStyle}
            >
              {/* Card */}
              <div 
                className={`
                  w-full h-full rounded-3xl bg-gradient-to-br ${sign.gradient} 
                  shadow-2xl relative overflow-hidden backdrop-blur-sm cursor-pointer
                  transform transition-transform duration-300 hover:scale-105
                `}
                onClick={() => {
                  if (index === currentIndex) {
                    handleCardSelect();
                  } else {
                    setCurrentIndex(index);
                  }
                }}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between text-center">
                  {/* Symbol */}
                  <div className="text-7xl font-bold mb-4 drop-shadow-lg animate-pulse">
                    {sign.symbol}
                  </div>
                  
                  {/* Name and details */}
                  <div>
                    <h3 className="font-bold text-2xl mb-3 drop-shadow-md">
                      {sign.name}
                    </h3>
                    <p className="text-sm text-white/90 drop-shadow-sm mb-2">
                      {sign.trait}
                    </p>
                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                      <p className="text-xs text-white/90 font-medium">
                        {sign.element}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {zodiacSigns.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/30 hover:bg-white/50'
              }
            `}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      <div className="text-center mt-6 opacity-60">
        <p className="text-sm">← Swipe to explore →</p>
      </div>

      {/* Selected Sign Details */}
      {selectedSign && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-end justify-center z-50">
          <div className="bg-gradient-to-t from-black/80 to-transparent w-full max-w-md p-8 pb-12 rounded-t-3xl transform translate-y-0 transition-all duration-500 ease-out animate-[slideUp_0.5s_ease-out]">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-1 bg-white/30 rounded-full"></div>
            </div>
            
            <div className="text-center">
              <div className={`text-8xl text-white  mb-6 bg-gradient-to-br ${selectedSign.gradient} bg-clip-text text-transparent`}>
                {selectedSign.symbol}
              </div>
              <h2 className="text-3xl font-bold mb-3">{selectedSign.name}</h2>
              <p className="text-white/70 mb-2 text-lg">{selectedSign.trait}</p>
              <p className="text-white/60">Element: {selectedSign.element}</p>
              
              <div className="flex space-x-4 mt-8">
                <button 
                  onClick={() => setSelectedSign(null)}
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  Back
                </button>
                <button 
                  onClick={()=>{
                    data.setUserDetails({...data.userDetails,zodiacSign:selectedSign.id})
                    console.log(data)
                    navigate("/question-splash")
                  }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for animations */}
      <style jsx="true">{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}