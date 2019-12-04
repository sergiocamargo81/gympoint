import * as Yup from 'yup';

import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const query = req.query.q || '';

    const students = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      attributes: [
        'id',
        'name',
        'email',
        'age',
        'weight',
        'height',
        'created_at',
        'updated_at',
      ],
      order: ['id'],
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
      weight: Yup.number()
        .positive()
        .integer()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      oldEmail: Yup.string().email(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number()
        .positive()
        .integer(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldEmail } = req.body;

    let student;

    if (oldEmail) {
      student = await Student.findOne({
        where: { email: oldEmail },
      });

      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }

      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'Student already exists, can not update' });
      }
    } else {
      student = await Student.findOne({
        where: { email },
      });

      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }
    }

    const { id, name, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
