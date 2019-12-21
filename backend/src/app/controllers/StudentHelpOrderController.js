import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class StudentHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { student_id: req.student.id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
      ],
      order: [['created_at', 'desc']],
    });

    return res.json(helpOrders);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: req.student.id,
      question: req.body.question,
    });

    const helpOrderUpdated = await HelpOrder.findByPk(helpOrder.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
      ],
    });

    return res.json(helpOrderUpdated);
  }
}

export default new StudentHelpOrderController();
