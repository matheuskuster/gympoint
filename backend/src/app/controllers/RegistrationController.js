import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { id, page } = req.query;
    const limit = 10;
    const offset = page * limit || 0;
    let registrations;

    if (!id || id === '') {
      registrations = await Registration.findAndCountAll({
        order: ['start_date'],
        attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title', 'duration', 'price'],
          },
        ],
        limit,
        offset,
      });

      registrations.maxPage =
        registrations.count > 10 ? Math.floor(registrations.count / limit) : 0;
    } else {
      registrations = await Registration.findByPk(id, {
        attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title', 'duration', 'price'],
          },
        ],
      });
    }

    if (!registrations) {
      return res.status(404).json({ error: 'Registrations were not found' });
    }

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(401).json({ error: 'Validation failed' });

    const { student_id, plan_id, start_date } = req.body;

    const studentAlreadyRegistrated = await Registration.findOne({
      where: { student_id: req.body.student_id },
    });

    if (studentAlreadyRegistrated) {
      return res.status(400).json({
        error: 'Student already registrated in another plan',
      });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.duration * plan.price;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const { name, email } = await Student.findByPk(student_id);
    const formattedDate = format(end_date, 'dd/MM/yyyy');

    await Queue.add(RegistrationMail.key, {
      name,
      email,
      plan,
      formattedDate,
      price,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const registration = await Registration.findByPk(req.body.id);

    const updatedRegistration = await registration.update(req.body);

    return res.json(updatedRegistration);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const registration = await Registration.findByPk(req.body.id);

    await Registration.destroy({
      where: { id: req.body.id },
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
