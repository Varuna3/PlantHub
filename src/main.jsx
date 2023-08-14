import './main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import SignUpPage from './components/SignUpPage.jsx'

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
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
