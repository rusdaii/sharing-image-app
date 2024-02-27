import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Home from '@/components/pages/Home';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';

export const metadata = generateMetadata(
  { title: 'Home' },
  { withSuffix: true }
);

const HomePage = async () => {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
};

export default HomePage;
