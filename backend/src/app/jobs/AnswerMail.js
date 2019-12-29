import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { updatedOrder } = data;

    Mail.sendMail({
      to: `${updatedOrder.student.name} <${updatedOrder.student.email}>`,
      subject: 'GymPoint - Sua pergunta foi respondida',
      html: `<p>
              <strong>${updatedOrder.question}</strong><br/>
              R: ${updatedOrder.answer}
              <br/><br/>
              <small>Respondido em: ${updatedOrder.formattedDate}</small>
            </p>
      `,
    });
  }
}

export default new AnswerMail();
