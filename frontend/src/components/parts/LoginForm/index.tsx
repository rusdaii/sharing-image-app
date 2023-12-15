'use client';

import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/parts/Button';
import { setAccessToken } from '@/lib/cookies';
import { login } from '@/repositories/auth';
import { AuthPayload } from '@/repositories/auth/types';

const LoginForm = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<AuthPayload>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async ({ data }) => {
      const signInResponse = await signIn('credentials', {
        redirect: false,
        id: data.id,
        username: data.username,
        avatarUrl: data.avatarUrl,
        accessToken: data.accessToken,
      });

      if (signInResponse && signInResponse.error) {
        toast.error('Something went wrong');
        return;
      }

      setAccessToken(data.accessToken);

      router.push('/');
    },
  });

  const onSubmit = useCallback(
    (data: AuthPayload) => {
      loginMutation.mutate(data);
    },
    [loginMutation]
  );
  return (
    <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        Login
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            className="w-full input input-bordered"
            id="username"
            type="text"
            placeholder="Username"
            {...register('username')}
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            className="w-full input input-bordered"
            id="password"
            type="password"
            placeholder="Enter Password"
            {...register('password')}
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            isLoading={loginMutation.status === 'pending'}
          >
            Login
          </Button>
        </div>
      </form>
      <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
        {`Don't have an account ?`}{' '}
        <Link
          className="cursor-pointer text-primary hover:text-secondary"
          href="/register"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
