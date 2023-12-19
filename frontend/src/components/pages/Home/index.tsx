'use client';
import { useEffect, useState } from 'react';

import FileForm from '@/components/parts/FileForm';
import ImageCard from '@/components/parts/ImageCard';
import { useImages } from '@/query/images';
import { ImageProps } from '@/repositories/images/types';

const Home = () => {
  const [isLoading, setLoading] = useState(true);

  const { data } = useImages();

  const images: ImageProps[] = data?.data ?? [];

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="h-screen p-16">
      <FileForm />

      {isLoading ? (
        <div className="flex justify-center items-center h-1/2">
          <span className="loading loading-dots loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images?.map((item: ImageProps) => (
            <ImageCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
