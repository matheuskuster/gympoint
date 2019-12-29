import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { name, email, plan, formattedDate, price } = data;

    Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'GymPoint - Matrícula efetuada com sucesso',
      html: `<strong>Olá ${name}</strong>, seja bem-vindo(a) ao GymPoint.<br/><br/>
            <p>
            Confira abaixo alguns detalhes da sua assinatura: <br/>
            <strong>Plano: </strong>${plan.title}<br/>
            <strong>Duração: </strong>${plan.duration} meses<br/>
            <strong>Término: </strong>${formattedDate}<br/>
            <strong>Valor mensal: </strong>R$${plan.price}<br/>
            <strong>Valor final: </strong>R$${price}<br/>
            </p>
      `,
    });
  }
}

export default new RegistrationMail();
