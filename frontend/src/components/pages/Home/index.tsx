'use client';
import FileForm from '@/components/parts/FileForm';
import ImageCard from '@/components/parts/ImageCard';
import { useImages } from '@/query/images';
import { ImageProps } from '@/repositories/images/types';

const Home = () => {
  const { data } = useImages();

  const images: ImageProps[] = data?.data ?? [];

  return (
    <div className="h-screen p-16">
      <FileForm />
      <div className="grid grid-cols-3 gap-4">
        {images?.map((item: ImageProps) => (
          <ImageCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
