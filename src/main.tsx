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
import LoginForm from './Screens/LoginForm.tsx'
import MainLayout from './Screens/components/MainLayout.tsx'
import PricingScreen from './Screens/components/PricingScreen.tsx'
import DashBoardScreen from './Screens/DashBoardScreen.tsx'
import ReturnUrlPage from './Screens/components/ReturnUrlPage.tsx'
import SearchUserScreen from './Screens/comparescreens/SearchUserScreen.tsx'
import CreateLinkScreen from './Screens/comparescreens/CraeteLinkScreen.tsx'
import CompareScreen from './Screens/comparescreens/CompareScreen.tsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <StartScreen />,
  },
  {
    path:'/login',
    element:<LoginForm/>
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
   
    element:<MainLayout/>,
    children:[
      {
        path:'/valid/pricing-screen',
        element: <PricingScreen/>
      },
      {
        path:'/final-screen',
        element:<PersonalityResults/>
      },
      {
        path:'/dashboard',
        element:<DashBoardScreen/>
      },
      {
        path:'/return-url',
        element:<ReturnUrlPage/>
      },
      {
        path:'/compare/search',
        element: <SearchUserScreen/>
      },
      {
        path:"/compare",
        element:<CompareScreen/>
      },
       {
        path:'/compare/share',
        element: <CreateLinkScreen/>
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <UserContext>
 <RouterProvider router={router} />
 </UserContext>
 ,
)
