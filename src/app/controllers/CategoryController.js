import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { restaurant_id, name } = req.body;

    let category = await Category.findOne({
      where: { restaurant_id, name },
      paranoid: false,
    });

    if (category) {
      return res.status(409).json('Category already exists.');
    }

    category = await Category.create(req.body);

    return res.json(category);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json('Category not found.');
    }
    return res.json(category);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer(),
      name: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    let category = await Category.findOne({
      where: { id },
    });
    if (!category) {
      return res.status(404).json('Category not found.');
    }

    category = await category.update(req.body);

    return res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
    });
    if (!category) {
      return res.status(404).json('Category not found.');
    }

    const { deleted_at } = await category.destroy();

    return res.json({ id, deleted_at });
  }

  async index(req, res) {
    const { restaurant_id } = req.params;
    const { limit, offset } = req.body;
    const category = await Category.findAll({
      where: { restaurant_id },
      limit,
      offset,
    });

    return res.json(category);
  }
}

export default new CategoryController();
