import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { page } = req.query;
    const limit = 10;
    const offset = page * limit || 0;

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id: req.params.id,
      },
      attributes: ['id', 'createdAt'],
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    checkins.maxPage = Math.floor(checkins.count / limit);

    return res.json(checkins);
  }

  async store(req, res) {
    const last7DaysCheckins = await Checkin.findAndCountAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (last7DaysCheckins.count >= 5) {
      return res
        .status(401)
        .json({ error: 'You can only check-in 5 times in a 7-day period' });
    }

    const checkin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
