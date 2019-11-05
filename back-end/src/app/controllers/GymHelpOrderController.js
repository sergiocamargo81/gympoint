import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class GymHelpOrderController {
  async index(req, res) {
    const help_orders = await HelpOrder.findAll({
      where: { answer_at: null },
      attributes: [
        'id',
        'question',
        'answer',
        'answer_at',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
      ],
    });

    return res.json(help_orders);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Answer validation fails' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exists' });
    }

    await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    const helpOrderUpdated = await HelpOrder.findByPk(helpOrder.id, {
      attributes: [
        'id',
        'question',
        'answer',
        'answer_at',
        'created_at',
        'updated_at',
      ],
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

export default new GymHelpOrderController();
