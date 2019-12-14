import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const page =
      !req.query.page || Number.isNaN(req.query.page)
        ? 1
        : parseInt(req.query.page, 10);

    const pageSize =
      !req.query.pageSize || Number.isNaN(req.query.pageSize)
        ? 10
        : parseInt(req.query.pageSize, 10);

    const result = await Plan.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      attributes: [
        'id',
        'title',
        'duration',
        'price',
        'created_at',
        'updated_at',
      ],
      order: ['id'],
    });

    return res.json({
      page: {
        index: page,
        total:
          parseInt(result.count / pageSize, 10) +
          (result.count % pageSize > 0 ? 1 : 0),
        size: pageSize,
      },
      plans: result.rows,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    plan.destroy();

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.body.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const planUpdated = await plan.update(req.body);

    return res.json(planUpdated);
  }
}

export default new PlanController();
