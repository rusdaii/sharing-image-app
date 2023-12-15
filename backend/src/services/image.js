const CloudinaryStorage = require('../lib/cloudinary/CloudinaryStorage');

const folderStorage = require('../constants/folderStorage');

const prisma = require('../lib/prisma');

class ImageService {
  static getImages = async () => {
    const images = await prisma.image.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        User: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return images;
  };

  static uploadImage = async (id, file) => {
    const { secure_url: imageFile } = await CloudinaryStorage.upload(file, {
      folder: folderStorage.cloudinary.IMAGE,
    });

    const image = await prisma.image.create({
      data: {
        imageUrl: imageFile,
        User: {
          connect: {
            id,
          },
        },
      },
    });

    return image;
  };

  static deleteImage = async (id) => {
    const findImage = await prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!findImage) {
      throw new Error('Image not found');
    }

    await prisma.image.delete({
      where: {
        id,
      },
    });

    return;
  };
}

module.exports = ImageService;
