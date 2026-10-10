import { Suspense, lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter, useParams } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import SessionGate from './components/auth/SessionGate';
import RequireAuth from './components/auth/RequireAuth';
import GuestOnly from './components/auth/GuestOnly';
import CurriculumGate from './components/auth/CurriculumGate';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import PageLoader from './components/ui/PageLoader';
import useTheme from './hooks/useTheme';
import { ROUTES } from './utils/constants';

// Lesson pages pull in Markdown rendering (and later Sandpack), so they load on demand
const TopicView = lazy(() => import('./pages/TopicView'));

// Old practice URLs now open the Practice step of the topic page
function PracticeRedirect() {
  const { topicId } = useParams();
  return <Navigate to={ROUTES.practice(topicId)} replace />;
}

const router = createBrowserRouter([
  {
    path: '/',
    // Resolves the session (via the auth cookie) before any route renders
    element: <SessionGate />,
    errorElement: <ErrorPage />,
    children: [
      // Public: logged-in users are redirected away
      {
        element: <GuestOnly />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      // Private: requires a session, then loads the curriculum once
      {
        element: <RequireAuth />,
        children: [
          {
            element: <CurriculumGate />,
            children: [
              {
                element: <AppLayout />,
                children: [
                  { index: true, element: <Dashboard /> },
                  { path: '*', element: <NotFound /> },
                ],
              },
              // Full-screen lesson mode (Learn -> Practice), no sidebar
              {
                path: 'topics/:topicId',
                element: (
                  <Suspense fallback={<PageLoader fullScreen />}>
                    <TopicView />
                  </Suspense>
                ),
              },
              { path: 'practice/:topicId', element: <PracticeRedirect /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  useTheme();
  return <RouterProvider router={router} />;
}
