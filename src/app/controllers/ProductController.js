import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer().required(),
      category_id: Yup.number().integer().required(),
      name: Yup.string().required(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { restaurant_id, category_id, name } = req.body;

    let product = await Product.findOne({
      where: { restaurant_id, category_id, name },
      paranoid: false,
    });

    if (product) {
      return res.status(409).json('Product already exists.');
    }

    product = await Product.create(req.body);

    return res.json(product);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
    });

    if (!product) {
      return res.status(404).json('Product not found.');
    }
    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer(),
      category_id: Yup.number().integer(),
      name: Yup.string(),
      description: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    let product = await Product.findOne({
      where: { id },
    });
    if (!product) {
      return res.status(404).json('Product not found.');
    }

    product = await product.update(req.body);

    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
    });
    if (!product) {
      return res.status(404).json('Product not found.');
    }

    const { deleted_at } = await product.destroy();

    return res.json({ id, deleted_at });
  }

  async index(req, res) {
    const { restaurant_id } = req.params;
    const { limit, offset } = req.body;
    const product = await Product.findAll({
      where: { restaurant_id },
      limit,
      offset,
    });

    return res.json(product);
  }
}

export default new ProductController();
