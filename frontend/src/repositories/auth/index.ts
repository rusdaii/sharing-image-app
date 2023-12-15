import fetcher from '@/lib/fetcher';

import { AuthPayload, LoginResponse, RegisterResponse } from './types';

export const login = async ({ username, password }: AuthPayload) => {
  const response = await fetcher({
    url: '/auth/login',
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  return response as LoginResponse;
};

export const registerUser = async ({ username, password }: AuthPayload) => {
  const response = await fetcher({
    url: '/auth/register',
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  return response as RegisterResponse;
};
