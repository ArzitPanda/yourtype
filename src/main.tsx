import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import StartScreen from './Screens/StartScreen.tsx'
import UserNameScreen from './Screens/UserNameScreen.tsx'
import UserContext from './components/context/UserContext.tsx'
import ZodiacSelector from './Screens/ZodiacSelector.tsx'
import QuestionnaireSplash from './Screens/QuestionnaireSplash.tsx'
import QuestionScreen from './Screens/QuestionScreen.tsx'
import PersonalityResults from './Screens/PersonalityResults.tsx'
import AgeSelectorScreen from './Screens/AgeSelectorScreen.tsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <StartScreen />,
  },
  {
    path: '/age-selector',
    element: <AgeSelectorScreen />,
  },
  {
    path: '/user-name',
    element: <UserNameScreen />,
  },
  {
    path:'/zodiac-seletor',
    element:<ZodiacSelector/>
  },
  {
    path:'/question-splash',
    element:<QuestionnaireSplash/>
  },
  {
    path:'/question-answer',
    element:<QuestionScreen/>
  },
  {
    path:'/final-screen',
    element:<PersonalityResults/>
  }
])


createRoot(document.getElementById('root')!).render(
  <UserContext>
 <RouterProvider router={router} />
 </UserContext>
 ,
)
