import { useQuery } from '@tanstack/react-query';

import { getImages } from '@/repositories/images';

export const getImagesKey = () => ['images'];

export const useImages = () => {
  const result = useQuery({
    queryKey: getImagesKey(),
    queryFn: () => getImages(),
  });

  return result;
};
