export interface ImageProps {
  id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  User: {
    id: string;
    username: string;
    avatarUrl: string;
  };
}

export type ImagesResponse = {
  data: ImageProps[];
};
