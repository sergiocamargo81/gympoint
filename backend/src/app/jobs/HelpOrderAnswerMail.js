import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { helpOrder, student } = data;

    // console.log('A fila executou...');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Resposta do seu pedido de auxílio!',
      template: 'help-order-answer',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answerAt: format(
          parseISO(helpOrder.answer_at),
          "dd/MM/yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new HelpOrderAnswerMail();
