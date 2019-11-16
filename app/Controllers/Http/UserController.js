'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'email', 'password']);
    const addresess = request.input('addresess');

    const user = await User.create(data);

    await user.addresess().createMany(addresess);

    return user;
  }
}

module.exports = UserController;
