import './main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'
import LoginPage from './LoginPage'
import SignUpPage from './components/SignUpPage'
import ProfilePage from './components/ProfilePage'
import NewPlantPage from './components/NewPlantPage'
import Aiur from './components/Aiur'
import PlantRequestPage from './components/PlantRequestPage'
import FriendsPage from './components/FriendsPage'
import VisitFriendPage from './components/VisitFriendPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <LoginPage />
      </>
    ),
    children: [],
  },
  {
    path: '/SignUp',
    element: <SignUpPage />,
  },
  {
    path: '/Profile',
    element: <ProfilePage />,
  },
  {
    path: '/NewPlant',
    element: <NewPlantPage />,
  },
  {
    path: '/Aiur',
    element: <Aiur />,
  },
  {
    path: '/PlantRequest',
    element: <PlantRequestPage />,
  },
  {
    path: '/Friends',
    element: <FriendsPage />,
  },
  {
    path: '/Visit',
    element: <VisitFriendPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
