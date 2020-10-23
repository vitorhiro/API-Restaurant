import * as Yup from 'yup';
import ProductTablePrice from '../models/ProductTablePrice';

class ProductTablePriceController {
  async store(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer().required(),
      product_id: Yup.number().integer().required(),
      regular_price: Yup.number().required(),
      promotional_price: Yup.number(),
      promotional_price_description: Yup.string(),
      promotional_price_start_at: Yup.date(),
      promotional_price_end_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const productTablePrice = await ProductTablePrice.create(req.body);

    return res.json(productTablePrice);
  }

  async show(req, res) {
    const { id } = req.params;
    const productTablePrice = await ProductTablePrice.findOne({
      where: { id },
    });

    if (!productTablePrice) {
      return res.status(404).json('Product table price not found.');
    }
    return res.json(productTablePrice);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      restaurant_id: Yup.number().integer(),
      product_id: Yup.number().integer(),
      regular_price: Yup.number(),
      promotional_price: Yup.number(),
      promotional_price_description: Yup.string(),
      promotional_price_start_at: Yup.date(),
      promotional_price_end_at: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    let productTablePrice = await ProductTablePrice.findOne({ where: { id } });
    if (!productTablePrice) {
      return res.status(404).json('Product table price not found.');
    }

    productTablePrice = await productTablePrice.update(req.body);

    return res.json(productTablePrice);
  }

  async delete(req, res) {
    const { id } = req.params;

    const productTablePrice = await ProductTablePrice.findOne({
      where: { id },
    });

    if (!productTablePrice) {
      return res.status(404).json('Product table price not found.');
    }

    const { deleted_at } = await productTablePrice.destroy();

    return res.json({ id, deleted_at });
  }

  async index(req, res) {
    const { product_id } = req.params;
    const productTablePrice = await ProductTablePrice.findAll({
      where: { product_id },
    });

    return res.json(productTablePrice);
  }
}

export default new ProductTablePriceController();
