import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { membership, student, plan } = data;

    // console.log('A fila executou...');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Bem vindo!',
      template: 'welcome',
      context: {
        student: student.name,
        plan: plan.title,
        starts: format(
          parseISO(membership.start_date),
          "dd/MM/yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        ends: format(
          parseISO(membership.end_date),
          "dd/MM/yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: membership.price,
      },
    });
  }
}

export default new WelcomeMail();
