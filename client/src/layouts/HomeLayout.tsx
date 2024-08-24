import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  setIsLoggedIn: (val: boolean) => void;
  isLoggedIn: boolean | null;
}

export default function HomeLayout({ setIsLoggedIn, isLoggedIn }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/signin');
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn === false) return <Navigate to="/signin" />;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </header>

      <Outlet />
    </div>
  );
}
