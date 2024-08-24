import { useState } from 'react';
import { api } from '../api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface Props {
  setIsLoggedIn: (val: boolean) => void;
}

export default function Signup({ setIsLoggedIn }: Props) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profession: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, phone, profession } = formState;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const { data } = await api.post('/auth/signup', formState);

      toast.success('account created successfully.');

      localStorage.setItem('token', data.token);

      setIsLoading(false);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || error?.message);
        setIsLoading(false);
        return;
      }
      if (error instanceof Error) {
        console.log(error);
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
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              value={name}
              onChange={onChange}
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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

          <div className="mb-2">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              value={phone}
              onChange={onChange}
              name="phone"
              id="phone"
              type="tel"
              placeholder="Your phone number"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="profession"
            >
              Profession
            </label>
            <input
              value={profession}
              onChange={onChange}
              name="profession"
              id="profession"
              type="text"
              placeholder="Your profession"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mt-2">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
