import * as Yup from 'yup';

import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const page =
      !req.query.page || Number.isNaN(req.query.page)
        ? 1
        : parseInt(req.query.page, 10);

    const pageSize =
      !req.query.pageSize || Number.isNaN(req.query.pageSize)
        ? 10
        : parseInt(req.query.pageSize, 10);

    const { id } = req.query;

    const nameFilter = req.query.nameFilter || '';

    let where;

    if (id > 0) {
      where = {
        id,
      };
    } else if (nameFilter) {
      where = {
        name: {
          [Op.iLike]: `%${nameFilter}%`,
        },
      };
    } else {
      where = {};
    }

    const result = await Student.findAndCountAll({
      where,
      limit: pageSize,
      offset: (page - 1) * pageSize,
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
      order: ['name'],
    });

    return res.json({
      page: {
        index: page,
        total:
          parseInt(result.count / pageSize, 10) +
          (result.count % pageSize > 0 ? 1 : 0),
        size: pageSize,
      },
      students: result.rows,
    });
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
      id: Yup.number()
        .positive()
        .integer(),
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
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

    const id = parseInt(req.body.id, 10);
    const { email } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const emailExists = await Student.findOne({
      where: { email, id: { [Op.ne]: id } },
    });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: 'There is another student with this email' });
    }

    const updatedStudent = await student.update({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
    });

    return res.json(updatedStudent);
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    student.destroy();

    return res.json(student);
  }
}

export default new StudentController();
