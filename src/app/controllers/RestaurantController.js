import * as Yup from 'yup';
import path from 'path';
import Restaurant from '../models/Restaurant';

class RestaurantController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      name: Yup.string().required(),
      phone: Yup.string(),
      cnpj: Yup.string().required(),
      path: Yup.string(),
      thumb_path: Yup.string(),
      zip_code: Yup.string().required(),
      street: Yup.string().required(),
      complement: Yup.string(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      number: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { cnpj } = req.body;
    const photoPath = `restaurant_${path.parse(req.file.path).name}.jpeg`;
    const thumbPath = `restaurant_${path.parse(req.file.path).name}_thumb.jpeg`;

    let restaurant = await Restaurant.findOne({
      where: { cnpj },
      paranoid: false,
    });

    if (restaurant) {
      return res.status(409).json('Restaurant already exists.');
    }

    restaurant = await Restaurant.create({
      ...req.body,
      path: photoPath,
      thumb_path: thumbPath,
    });

    return res.json(restaurant);
  }

  async show(req, res) {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
      where: { id },
      attributes: { exclude: ['password_hash'] },
    });

    if (!restaurant) {
      return res.status(404).json('Restaurant not found.');
    }
    return res.json(restaurant);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string().min(6),
      name: Yup.string(),
      phone: Yup.string(),
      cnpj: Yup.string(),
      path: Yup.string(),
      thumb_path: Yup.string(),
      zip_code: Yup.string(),
      street: Yup.string(),
      complement: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      number: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const photoPath = `restaurant_${path.parse(req.file.path).name}.jpeg`;
    const thumbPath = `restaurant_${path.parse(req.file.path).name}_thumb.jpeg`;

    let restaurant = await Restaurant.findOne({ where: { id } });
    if (!restaurant) {
      return res.status(404).json('Restaurant not found.');
    }

    restaurant = await restaurant.update({
      ...req.body,
      path: photoPath,
      thumb_path: thumbPath,
    });

    return res.json(restaurant);
  }

  async delete(req, res) {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({ where: { id } });
    if (!restaurant) {
      return res.status(404).json('Restaurant not found.');
    }

    const { deleted_at } = await restaurant.destroy();

    return res.json({ id, deleted_at });
  }

  async index(req, res) {
    const restaurants = await Restaurant.findAll({
      attributes: {
        exclude: ['password_hash'],
      },
    });

    return res.json(restaurants);
  }
}

export default new RestaurantController();
