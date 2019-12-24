import Membership from '../models/Membership';

class StudentSessionController {
  async index(req, res) {
    const student_id = req.student.id;
    const active = true;

    const result = await Membership.findAll({
      where: { student_id },
    });

    if (result.filter(m => m.active === true).length === 0) {
      return res
        .status(400)
        .json({ error: 'Student does not have a active membership' });
    }

    return res.json(req.student);
  }
}

export default new StudentSessionController();
