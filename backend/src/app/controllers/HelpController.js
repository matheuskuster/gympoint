import * as Yup from 'yup';
import { format } from 'date-fns';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class HelpController {
  async index(req, res) {
    const { id, page } = req.query;
    const limit = 10;
    const offset = page * limit || 0;

    let helpOrders;

    if (!id || id === '') {
      helpOrders = await HelpOrder.findAndCountAll({
        attributes: ['id', 'question', 'student_id'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name'],
          },
        ],
        order: [['answer_at', 'ASC']],
        where: {
          answer: null,
        },
        limit,
        offset,
      });
    } else {
      helpOrders = await HelpOrder.findAndCountAll({
        where: { student_id: id },
        attributes: ['id', 'question', 'answer', 'answer_at', 'createdAt'],
        order: [['answer_at', 'ASC']],
        limit,
        offset,
      });
    }

    helpOrders.maxPage =
      helpOrders.count > 10 ? Math.floor(helpOrders.count / limit) : 0;

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const helpOrder = await HelpOrder.create({
      student_id: req.params.id,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const { answer } = req.body;
    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
        },
      ],
    });

    const updatedOrder = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    const formattedDate = format(
      updatedOrder.answer_at,
      "dd/MM/yyyy 'às' H:mm"
    );

    updatedOrder.formattedDate = formattedDate;

    await Queue.add(AnswerMail.key, {
      updatedOrder,
    });

    return res.json(updatedOrder);
  }
}

export default new HelpController();
