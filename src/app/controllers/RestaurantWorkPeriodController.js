import * as Yup from 'yup';
import RestaurantWorkPeriod from '../models/RestaurantWorkPeriod';

class RestaurantWorkPeriodController {
  async store(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer().required(),
      week_day: Yup.number().integer().required(),
      start_hour: Yup.string().required(),
      end_hour: Yup.string().required(),
      period: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { restaurant_id, week_day, period } = req.body;

    let workPeriod = await RestaurantWorkPeriod.findOne({
      where: { restaurant_id, week_day, period },
      paranoid: false,
    });

    if (workPeriod) {
      return res.status(409).json('Work period already exists.');
    }

    workPeriod = await RestaurantWorkPeriod.create(req.body);

    return res.json(workPeriod);
  }

  async show(req, res) {
    const { id } = req.params;

    const workPeriod = await RestaurantWorkPeriod.findOne({
      where: { id },
    });

    if (!workPeriod) {
      return res.status(404).json('Work period not found.');
    }
    return res.json(workPeriod);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer(),
      week_day: Yup.number().integer(),
      start_hour: Yup.string(),
      end_hour: Yup.string(),
      period: Yup.number().integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    let workPeriod = await RestaurantWorkPeriod.findOne({
      where: { id },
    });
    if (!workPeriod) {
      return res.status(404).json('Work period not found.');
    }

    workPeriod = await workPeriod.update(req.body);

    return res.json(workPeriod);
  }

  async delete(req, res) {
    const { id } = req.params;

    const workPeriod = await RestaurantWorkPeriod.findOne({
      where: { id },
    });
    if (!workPeriod) {
      return res.status(404).json('Work period not found.');
    }

    const { deleted_at } = await workPeriod.destroy();

    return res.json({ id, deleted_at });
  }

  async index(req, res) {
    const { restaurant_id } = req.params;
    const workPeriods = await RestaurantWorkPeriod.findAll({
      where: { restaurant_id },
    });

    return res.json(workPeriods);
  }
}

export default new RestaurantWorkPeriodController();
