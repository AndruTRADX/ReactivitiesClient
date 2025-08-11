import { createBrowserRouter } from 'react-router'
import App from '../layout/App'
import HomePage from '../../features/home/HomePage'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import ActivityForm from '../../features/activities/form/ActivityForm'
import ActivityDetailsPage from '../../features/activities/details/ActivityDetailsPage'
import Counter from '../../features/counter/Counter'

export const router = createBrowserRouter([
  // This works as a layout from Next.js OMG so useful
  // Everything within <App /> acts as a Layout component
  // The children will be whats within the <App /> (Layout)
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
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
      {
        path: 'counter',
        element: <Counter />,
      },
    ],
  },
])
