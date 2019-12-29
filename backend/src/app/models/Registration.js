import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter, addMonths, parseISO } from 'date-fns';
import Plan from './Plan';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATEONLY,
        end_date: Sequelize.DATEONLY,
        price: Sequelize.FLOAT,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(parseISO(this.get('start_date')), new Date()) &&
              isAfter(parseISO(this.get('end_date')), new Date())
            );
          },
        },
      },
      { sequelize }
    );

    this.addHook('beforeUpdate', async registration => {
      const plan = await Plan.findByPk(registration.plan_id);
      registration.price = plan.price * plan.duration;
      registration.end_date = addMonths(
        parseISO(registration.start_date),
        plan.duration
      );
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, {
      foreignKey: 'plan_id',
      as: 'plan',
    });

    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
      constraints: false,
    });
  }
}

export default Registration;
