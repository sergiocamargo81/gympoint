import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.student.id },
      order: [['createdAt', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const highDate = new Date();
    const lowDate = subDays(highDate, 7);

    const checkins = await Checkin.findAll({
      where: {
        student_id: req.student.id,
        created_at: { [Op.between]: [lowDate, highDate] },
      },
    });

    if (checkins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Students can only do 5 checkins within 7 days' });
    }

    const checkin = await Checkin.create({ student_id: req.student.id });

    return res.json(checkin);
  }
}

export default new CheckinController();
