import Link from 'next/link';

import RegisterForm from '@/components/parts/RegisterForm';
import { Card, CardContent } from '@/components/ui/card';

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RegisterForm />

      <Card className="w-[400px] mt-5">
        <CardContent>
          <div className="mt-5 text-sm text-gray-700 text-center">
            {`Already have an account ?`}{' '}
            <Link
              className="cursor-pointer text-primary font-semibold"
              href="/login"
            >
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
