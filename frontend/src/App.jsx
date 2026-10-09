import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import SessionGate from './components/auth/SessionGate';
import RequireAuth from './components/auth/RequireAuth';
import GuestOnly from './components/auth/GuestOnly';
import CurriculumGate from './components/auth/CurriculumGate';
import PageLoader from './components/ui/PageLoader';
import Dashboard from './pages/Dashboard';
import TopicView from './pages/TopicView';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import useTheme from './hooks/useTheme';

// Sandpack is heavy, so the editor is loaded only when a practice page is opened
const EditorPage = lazy(() => import('./pages/EditorPage'));

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
                  { path: 'topics/:topicId', element: <TopicView /> },
                  { path: '*', element: <NotFound /> },
                ],
              },
              {
                // Full-screen, distraction-free editor (no sidebar)
                path: 'practice/:topicId',
                element: (
                  <Suspense fallback={<PageLoader fullScreen />}>
                    <EditorPage />
                  </Suspense>
                ),
              },
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
