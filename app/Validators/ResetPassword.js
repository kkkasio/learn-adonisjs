'use strict';

class ResetPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required|string',
      password: 'required|confirmed'
    };
  }
}

module.exports = ResetPassword;
