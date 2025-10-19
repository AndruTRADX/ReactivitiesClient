import { createBrowserRouter, Navigate } from 'react-router'
import App from '../layout/App'
import HomePage from '../../features/home/HomePage'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import ActivityForm from '../../features/activities/form/ActivityForm'
import ActivityDetailsPage from '../../features/activities/details/ActivityDetailsPage'
import Counter from '../../features/counter/Counter'
import TestErrors from '../../features/errors/TestErrors'
import NotFound from '../../features/errors/NotFound'
import ServerError from '../../features/errors/ServerError'
import LoginForm from '../../features/accounts/LoginForm'
import RequireAuth from './RequireAuth'
import RegisterForm from '../../features/accounts/RegisterForm'

export const router = createBrowserRouter([
  // This works as a layout from Next.js OMG so useful
  // Everything within <App /> acts as a Layout component
  // The children will be whats within the <App /> (Layout)
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          // All routes that need authentication go here
          {
            path: 'activities',
            element: <ActivityDashboard />,
          },
          {
            path: 'activities/:id',
            element: <ActivityDetailsPage />,
          },
          {
            path: 'createActivity',
            element: <ActivityForm key='create' />,
          },
          {
            path: 'editActivity/:id',
            element: <ActivityForm />,
          },
        ],
      },
      {
        path: '',
        element: <HomePage />,
      },

      {
        path: 'manage/:id',
        element: <ActivityForm />,
      },
      {
        path: 'counter',
        element: <Counter />,
      },
      {
        path: 'errors',
        element: <TestErrors />,
      },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: 'server-error',
        element: <ServerError />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
      },
      {
        path: '*',
        element: <Navigate replace to='/not-found' />,
      },
    ],
  },
])
