import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Membership from '../models/Membership';
import Student from '../models/Student';
import Plan from '../models/Plan';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../lib/Queue';

class MembershipController {
  async index(req, res) {
    const memberships = await Membership.findAll({
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'active',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Student,
          as: 'student',
        },
        {
          model: Plan,
          as: 'plan',
        },
      ],
      order: ['id'],
    });

    return res.json(memberships);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.body.student_id);

    if (!student) {
      res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      res.status(400).json({ error: 'Plan does not exists' });
    }

    const start_date = parseISO(req.body.start_date);

    const end_date = addMonths(start_date, plan.duration);

    const price = plan.duration * plan.price;

    const membership = await Membership.create({
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(WelcomeMail.key, { membership, student, plan });

    const membershipCreated = await Membership.findByPk(membership.id, {
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'active',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Student,
          as: 'student',
        },
        {
          model: Plan,
          as: 'plan',
        },
      ],
    });

    return res.json(membershipCreated);
  }

  async delete(req, res) {
    const membership = await Membership.findByPk(req.params.id);

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exists' });
    }

    membership.destroy();

    return res.json(membership);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .integer()
        .required(),
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const membership = await Membership.findByPk(req.body.id);

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exists' });
    }

    const student = await Student.findByPk(req.body.student_id);

    if (!student) {
      res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      res.status(400).json({ error: 'Plan does not exists' });
    }

    const start_date = parseISO(req.body.start_date);

    const end_date = addMonths(start_date, plan.duration);

    const price = plan.duration * plan.price;

    await membership.update({
      id: req.body.id,
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date,
      end_date,
      price,
    });

    const membershipUpdated = await Membership.findByPk(membership.id, {
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'active',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Student,
          as: 'student',
        },
        {
          model: Plan,
          as: 'plan',
        },
      ],
    });

    return res.json(membershipUpdated);
  }
}

export default new MembershipController();
