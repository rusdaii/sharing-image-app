import Link from 'next/link';

import LoginForm from '@/components/parts/LoginForm';
import { Card, CardContent } from '@/components/ui/card';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginForm />

      <Card className="w-[400px] mt-5">
        <CardContent>
          <div className="mt-5 text-sm text-gray-700 text-center">
            {`Don't have an account ?`}{' '}
            <Link
              className="cursor-pointer text-primary font-semibold"
              href="/register"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
