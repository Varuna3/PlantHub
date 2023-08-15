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
import HomePage from './components/HomePage'
import NewPlantPage from './components/NewPlantPage'

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
    path: '/Home',
    element: <HomePage />,
  },
  {
    path: '/NewPlant',
    element: <NewPlantPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
