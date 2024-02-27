import { getServerSession } from 'next-auth';

import Navbar from '@/components/parts/Navbar';

// eslint-disable-next-line import-alias/import-alias
import { options } from '../api/auth/[...nextauth]/options';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);

  const user = session?.user;

  return (
    <main>
      <Navbar user={user} />
      {children}
    </main>
  );
};

export default Layout;
