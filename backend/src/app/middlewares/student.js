import * as Yup from 'yup';

import Student from '../models/Student';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number()
      .integer()
      .positive()
      .required(),
  });

  if (!schema.isValid(req.params)) {
    return res.status(400).json({ error: 'Student validation fails' });
  }

  const student = await Student.findByPk(req.params.id);

  if (!student) {
    return res.status(400).json({ error: 'Student does not exists' });
  }

  req.student = student;

  return next();
};
