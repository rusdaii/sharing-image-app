const { VALIDATION_ERR } = require('../../constants/errorType');
const InvariantError = require('../../exeptions/InvariantError');
const { register, login } = require('./schema');

const authValidation = {
  validateRegister: (payload) => {
    const validationResult = register.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },

  validateLogin: (payload) => {
    const validationResult = login.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  },
};

module.exports = authValidation;
