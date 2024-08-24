import { useState } from 'react';
import { api } from '../api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface Props {
  setIsLoggedIn: (val: boolean) => void;
}

export default function Signin({ setIsLoggedIn }: Props) {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formState;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const { data } = await api.post('/auth/signin', formState);

      toast.success('account created successfully.');

      localStorage.setItem('token', data.token);

      setIsLoading(false);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || error.message);
        setIsLoading(false);
        return;
      }
      if (error instanceof Error) {
        toast.error(error.message);
        setIsLoading(false);
      } else {
        toast.error('An unexpected error occurred.');
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full my-4">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              onChange={onChange}
              name="email"
              id="email"
              type="email"
              placeholder="Your email"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={onChange}
              name="password"
              id="password"
              type="password"
              placeholder="Your password"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </button>
          </div>

          <div className="text-center mt-2">
            <p className="text-gray-600 text-sm mt-2">
              New here?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
