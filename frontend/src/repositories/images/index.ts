import fetcher from '@/lib/fetcher';

import { ImagesResponse } from './types';

export const getImages = async () => {
  const response = await fetcher({
    url: '/images',
  });

  return response as ImagesResponse;
};

export const uploadImage = async (file: any) => {
  const response = await fetcher({
    url: '/images/upload',
    method: 'POST',
    body: file,
    options: {
      isFormData: true,
    },
  });

  return response;
};
