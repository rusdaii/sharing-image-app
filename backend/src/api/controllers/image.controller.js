const InvariantError = require('../../exeptions/InvariantError');
const { successResponse } = require('../../lib/response');
const ImageService = require('../../services/image');

class ImageController {
  static getImages = async (req, res, next) => {
    try {
      const images = await ImageService.getImages();

      res.status(200).json(
        successResponse({
          message: 'Get images success',
          data: images,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static uploadImage = async (req, res, next) => {
    try {
      const file = req.file;
      const { id } = req.user;

      if (!file) {
        throw new InvariantError('File not found, please upload an image');
      }

      const image = await ImageService.uploadImage(id, file);

      res.status(201).json(
        successResponse({
          message: 'Upload image success',
          data: image,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteImage = async (req, res, next) => {
    try {
      const { id } = req.params;

      await ImageService.deleteImage(id);

      res.status(200).json(
        successResponse({
          message: 'Delete image success',
        }),
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ImageController;
