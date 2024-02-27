'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import playball from '@/assets/fonts/playball';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { setAccessToken } from '@/lib/cookies';
import { loginSchema } from '@/lib/zod';
import { login } from '@/repositories/auth';
import { AuthPayload } from '@/repositories/auth/types';

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

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

      toast({
        title: 'Login Success',
      });

      if (signInResponse && signInResponse.error) {
        toast({
          variant: 'destructive',
          title: signInResponse.error,
        });
        return;
      }

      setAccessToken(data.accessToken);

      router.replace('/');
    },
  });

  const onSubmit = useCallback(
    (data: AuthPayload) => {
      loginMutation.mutate(data);
    },
    [loginMutation]
  );
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex justify-center items-center">
        <h1 className={twMerge('text-5xl font-semibold', playball.className)}>
          Snapster
        </h1>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
