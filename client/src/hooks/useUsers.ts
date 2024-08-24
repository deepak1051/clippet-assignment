import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';
import axios, { AxiosError } from 'axios';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profession: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (controller: AbortController) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get('/users', {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setUsers(data);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
        return;
      }

      if (error instanceof AxiosError) {
        setError(`Failed to fetch users, ${error?.response?.data.message}`);
        setLoading(false);
      } else {
        setError(`Failed to fetch users`);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const refetch = () => {
    const controller = new AbortController();
    fetchData(controller);
  };

  return { users, loading, error, refetch };
};

export default useUsers;
