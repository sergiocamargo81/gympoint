import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';
import Queue from '../../lib/Queue';

class GymHelpOrderController {
  async index(req, res) {
    const page =
      !req.query.page || Number.isNaN(req.query.page)
        ? 1
        : parseInt(req.query.page, 10);

    const pageSize =
      !req.query.pageSize || Number.isNaN(req.query.pageSize)
        ? 10
        : parseInt(req.query.pageSize, 10);

    const result = await HelpOrder.findAndCountAll({
      where: { answer_at: null },
      limit: pageSize,
      offset: (page - 1) * pageSize,
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
      order: ['created_at'],
    });

    return res.json({
      page: {
        index: page,
        total:
          parseInt(result.count / pageSize, 10) +
          (result.count % pageSize > 0 ? 1 : 0),
        size: pageSize,
      },
      help_orders: result.rows,
    });
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

    await Queue.add(HelpOrderAnswerMail.key, {
      helpOrder: helpOrderUpdated,
      student: helpOrderUpdated.student,
    });

    return res.json(helpOrderUpdated);
  }
}

export default new GymHelpOrderController();
