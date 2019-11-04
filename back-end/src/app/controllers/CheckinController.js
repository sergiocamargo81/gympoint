import * as Yup from 'yup';
import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!schema.isValid(req.params)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      order: [['createdAt', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!schema.isValid(req.params)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const highDate = new Date();
    const lowDate = subDays(highDate, 7);

    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: { [Op.between]: [lowDate, highDate] },
      },
    });

    if (checkins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Students can only do 5 checkins within 7 days' });
    }

    const checkin = await Checkin.create({ student_id: req.params.id });

    return res.json(checkin);
  }
}

export default new CheckinController();
