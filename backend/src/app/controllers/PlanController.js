import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { id, page } = req.query;
    const limit = 10;
    const offset = page * limit || 0;
    let plans;

    if (!id || id === '') {
      plans = await Plan.findAndCountAll({
        attributes: ['id', 'title', 'price', 'duration'],
        order: [['duration', 'ASC']],
        limit,
        offset,
      });

      plans.maxPage = plans.count > 10 ? Math.floor(plans.count / limit) : 0;
    } else {
      plans = await Plan.findByPk(id);
    }

    if (!plans) {
      return res.status(404).json({ error: 'Plans were not found' });
    }

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      duration: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const plan = await Plan.findByPk(req.body.id);

    const updatedPlan = await plan.update(req.body);

    return res.json(updatedPlan);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const plan = await Plan.findByPk(req.body.id);

    await Plan.destroy({
      where: { id: req.body.id },
    });

    return res.json(plan);
  }
}

export default new PlanController();
