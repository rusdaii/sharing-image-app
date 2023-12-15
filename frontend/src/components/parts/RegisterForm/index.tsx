'use client';
import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/parts/Button';
import { registerUser } from '@/repositories/auth';
import { AuthPayload } from '@/repositories/auth/types';

const RegisterForm = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<AuthPayload>();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Account created successfully');
      router.push('/login');
    },
  });

  const onSubmit = useCallback(
    (data: AuthPayload) => {
      registerMutation.mutate(data);
    },
    [registerMutation]
  );

  return (
    <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        Register
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
            {...register('username', { required: true })}
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
            {...register('password', { required: true })}
          />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full"
            isLoading={registerMutation.status === 'pending'}
          >
            Register
          </Button>
        </div>
      </form>
      <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
        Already have an account ?{' '}
        <Link
          className="cursor-pointer text-primary hover:text-secondary"
          href="/login"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
