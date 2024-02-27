import Register from '@/components/pages/Register';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Sign Up' },
  { withSuffix: true }
);

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
