import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

async function createNewUser(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no Jogo de Perguntas',
      text: `Conta criada com sucesso.\n\n`,
      html: `<h1>Conta criada com sucesso.</h1>`,
    });

    console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    throw new Error(err);
  }
}
async function finishGame(to) {
    try {
      const config = await mailConfig();
  
      const transporter = nodemailer.createTransport(config);
  
      const info = await transporter.sendMail({
        from: 'noreplay@email.com',
        to,
        subject: 'Você terminou o Jogo de Perguntas',
        text: `Parabéns.\n\n`,
        html: `<h1>Parabéns.</h1>`,
      });
  
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (err) {
      throw new Error(err);
    }
  }
export default { finishGame };