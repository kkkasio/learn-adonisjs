const subDays = require('date-fns/subDays');
const isAfter = require('date-fns/isAfter');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const crypto = require('crypto');

const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/mail/src/Mail')} */
const Main = use('Mail');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();

      await Main.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('kasio@gmail.com', 'Kásio Eduardo | MinhaAPI')
            .subject('Recuperação de Senha');
        }
      );
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo não deu certo' } });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail('token', token);

      const tokenExpired = isAfter(
        subDays(new Date(), 2),
        user.token_created_at
      );

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token está expirado' } });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo deu errado ao alterar sua senha' } });
    }
  }
}

module.exports = ForgotPasswordController;
