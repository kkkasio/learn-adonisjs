/* eslint-disable no-console */

'use strict';

const Mail = use('Mail');
const Helpers = use('Helpers');

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'NewTaskMail-job';
  }

  // This is where the work is done.
  async handle({ username, email, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`);
    await Mail.send(
      ['emails.new_task'],
      { username, title, hasAttachment: !!file },
      message => {
        message
          .to(email)
          .from('no-reply@kasio.me', 'Kásio Eduado - Minha API')
          .subject('Nova tarefa para você!');

        if (file) {
          message.attach(Helpers.tmpPath(`upload/${file.file}`), {
            filename: file.name
          });
        }
      }
    );
  }
}

module.exports = NewTaskMail;
