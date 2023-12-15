const { NOT_FOUND_ERR } = require('../constants/errorType');
const ClientError = require('../exeptions/ClientError');
const prisma = require('../lib/prisma');

class UserService {
  static async getUser(payload) {
    const user = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      throw new ClientError('User not found', {
        statusCode: 404,
        type: NOT_FOUND_ERR,
      });
    }

    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

module.exports = UserService;
