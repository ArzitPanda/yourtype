import React, { useState, useEffect,useContext } from 'react';
import { ChevronLeft, Stars, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/components/context/SupabaseContext';
import { useNavigate } from 'react-router';
import { UserContextStore } from '@/components/context/UserContext';


// Type definitions
interface Scores {
  [key: string]: number;
}

interface Option {
  id: string;
  text: string;
  scores: Scores;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface Answer {
  questionId: number;
  selectedOption: Option;
  timestamp: Date;
}

// Mock data structure - replace with actual Supabase fetch
const mockQuestions: Question[] = [
  {
    id: 1,
    question: "When your friend cancels plans last minute, you:",
    options: [
      { id: 'a', text: "Secretly relieved tbh 😅", scores: { introversion: 3, adaptability: 2, emotional_intelligence: 1 } },
      { id: 'b', text: "Immediately make backup plans", scores: { leadership: 2, adaptability: 3, resilience: 2 } },
      { id: 'c', text: "Feel genuinely hurt but don't say anything", scores: { emotional_intelligence: 1, introversion: 2, sensitivity: 3 } },
      { id: 'd', text: "Call them out (respectfully)", scores: { leadership: 3, assertiveness: 3, emotional_intelligence: 2 } },
      { id: 'e', text: "Use it as me-time for self-care", scores: { self_awareness: 3, introversion: 2, resilience: 2 } },
      { id: 'f', text: "Already planning revenge (jk... or am I?)", scores: { humor: 3, assertiveness: 1, emotional_intelligence: 1 } }
    ]
  },
  {
    id: 2,
    question: "Your ideal Friday night is:",
    options: [
      { id: 'a', text: "Netflix + actual chill (alone)", scores: { introversion: 3, self_awareness: 2, creativity: 1 } },
      { id: 'b', text: "House party with the squad", scores: { extroversion: 3, leadership: 2, adaptability: 2 } },
      { id: 'c', text: "Deep conversations at 2 AM", scores: { emotional_intelligence: 3, introversion: 2, sensitivity: 2 } },
      { id: 'd', text: "Trying that new restaurant everyone's talking about", scores: { adaptability: 3, extroversion: 2, curiosity: 2 } },
      { id: 'e', text: "Working on my side hustle", scores: { ambition: 3, self_discipline: 3, leadership: 1 } },
      { id: 'f', text: "Whatever happens, happens", scores: { adaptability: 2, resilience: 2, humor: 2 } }
    ]
  },
  {
    id: 3,
    question: "When someone disagrees with you publicly, you:",
    options: [
      { id: 'a', text: "Defend your point like your life depends on it", scores: { assertiveness: 3, leadership: 2, resilience: 2 } },
      { id: 'b', text: "Listen and actually consider their perspective", scores: { emotional_intelligence: 3, adaptability: 2, wisdom: 2 } },
      { id: 'c', text: "Agree to disagree and move on", scores: { adaptability: 2, emotional_intelligence: 2, resilience: 2 } },
      { id: 'd', text: "Get heated but try to stay cool", scores: { emotional_intelligence: 1, assertiveness: 2, self_discipline: 2 } },
      { id: 'e', text: "Shut down and avoid the conversation", scores: { introversion: 3, sensitivity: 2, conflict_avoidance: 3 } },
      { id: 'f', text: "Make a joke to diffuse the tension", scores: { humor: 3, emotional_intelligence: 2, adaptability: 2 } }
    ]
  }
];

const QuestionScreen: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scores, setScores] = useState<Scores>({});
  const quizContext = useContext(UserContextStore);
  console.log(quizContext)


  async function getPersonalityAnalysis(personalityType:any) {
    try {
      const response = await fetch('https://vibgjtjlevdtvqlbntlr.supabase.co/functions/v1/bright-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personality_type: personalityType
        })
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      console.log('Personality Analysis:', data)
      quizContext?.setUserDetails({...quizContext.userDetails,personality:data,error:null});
      return data
    } catch (error) {
      console.error('Error calling personality function:', error)
      quizContext?.setUserDetails({...quizContext.userDetails,error:error});
      throw error
    }
  }

  const navigate = useNavigate();
  // Mock Supabase fetch - replace with actual implementation
useEffect(() => {
  const fetchQuestions = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase.rpc('get_random_questions_with_options');

      if (error) {
        console.error('Supabase fetch error:', error.message);
        setIsLoading(false);
        return;
      }

      const formattedQuestions: Question[] = (data || []).map((q: any) => ({
        id: q.id,
        question: q.question,
        options: (q.options || []).map((opt: any) => ({
          id: opt.id,
          text: opt.text,
          scores: opt.scores || {},
        })),
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchQuestions();
}, []);

  

  const currentQuestion: Question = questions[currentQuestionIndex];
  const progress: number = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (option: Option): void => {
    setSelectedOption(option);
  };

  const handleNext = (): void => {
    if (!selectedOption) return;

    // Update scores
    const newScores: Scores = { ...scores };
    Object.entries(selectedOption.scores).forEach(([trait, points]: [string, number]) => {
      newScores[trait] = (newScores[trait] || 0) + points;
    });
    setScores(newScores);

    // Save answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: selectedOption,
      timestamp: new Date()
    };
    setAnswers([...answers, newAnswer]);

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // All questions completed - process results
      handleQuizComplete(newScores);
    }
  };

  const handleQuizComplete = async (finalScores: Scores): Promise<void> => {
    // Here you would:
    // 1. Combine scores with zodiac sign traits
    // 2. Calculate character type and strengths/weaknesses
    // 3. Navigate to results screen
    const { data, error } = await supabase
    .from('userdata')
    .insert([
      { username: quizContext?.userDetails.userName, userage: 24,zodiac_sign:quizContext?.userDetails?.zodiacSign,personality_type:finalScores },
    ])
    .select();
    console.log(data);
    if(error){
      console.log(error);
    }

    getPersonalityAnalysis(data[0]?.personality_code)
    .then(result => {
      console.log(result)
      // Handle the response
    })
    .catch(error => {
      console.error('Failed to get analysis:', error)
    })

    console.log('Quiz completed!', {
      answers,
      finalScores,
      // zodiacSign: from context
    });
    navigate("/final-screen")
    
  };

  const handleBack = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      // Remove the last answer
      setAnswers(answers.slice(0, -1));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Stars className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/70">Loading your cosmic questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70">No questions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-16 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-80"></div>
        <div className="absolute top-60 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-40 right-8 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-60 left-12 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 pt-12">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleBack} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white/70" />
          </button>
          <div className="flex items-center space-x-2">
            <Stars className="w-5 h-5 text-purple-300" />
            <span className="text-sm text-white/70">{currentQuestionIndex + 1}/{questions.length}</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            {currentQuestion.question}
          </h1>
          <p className="text-white/60 text-sm">Pick the one that hits different</p>
        </div>
      </div>

      {/* Options */}
      <div className="relative z-10 px-6 pb-6">
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option: Option, index: number) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className={`
                w-full p-4 rounded-xl text-left transition-all duration-200 relative overflow-hidden group
                ${selectedOption?.id === option.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transform scale-105' 
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-102'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <span className="text-white font-medium pr-4">{option.text}</span>
                {selectedOption?.id === option.id && (
                  <CheckCircle className="w-5 h-5 text-white animate-bounce" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2
            ${selectedOption
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:scale-105' 
              : 'bg-white/10 text-white/50 cursor-not-allowed'
            }
          `}
        >
          <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See My Results'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Custom styles */}
      <style jsx="true">{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};

export default QuestionScreen;