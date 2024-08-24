import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { useEffect, useMemo, useState } from 'react';
import HomeLayout from './layouts/HomeLayout';
import EditUser from './pages/EditUser';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: (
            <HomeLayout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          ),
          children: [
            {
              index: true,

              element: <Homepage />,
            },
            {
              path: 'edit/:id',
              element: <EditUser />,
            },
          ],
        },

        {
          path: '/signup',
          element: isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <Signup setIsLoggedIn={setIsLoggedIn} />
          ),
        },
        {
          path: '/signin',
          element: isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <Signin setIsLoggedIn={setIsLoggedIn} />
          ),
        },
      ]),
    [isLoggedIn]
  );

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
