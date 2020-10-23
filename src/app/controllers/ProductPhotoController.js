import path from 'path';
import ProductPhoto from '../models/ProductPhoto';

class ProductPhotoController {
  async store(req, res) {
    const photoPath = `product_${path.parse(req.file.path).name}.jpeg`;
    const thumbPath = `product_${path.parse(req.file.path).name}_thumb.jpeg`;
    const { product_id } = req.params;

    const productPhoto = await ProductPhoto.create({
      product_id,
      path: photoPath,
      thumb_path: thumbPath,
    });

    return res.json(productPhoto);
  }

  async show(req, res) {
    const { id } = req.params;

    const productPhoto = await ProductPhoto.findOne({
      where: { id },
    });

    if (!productPhoto) {
      return res.status(404).json('Product photo not found.');
    }
    return res.json(productPhoto);
  }

  async update(req, res) {
    const { id } = req.params;

    let productPhoto = await ProductPhoto.findOne({
      where: { id },
    });
    if (!productPhoto) {
      return res.status(404).json('Product photo not found.');
    }

    productPhoto = await productPhoto.update(req.body);

    return res.json(productPhoto);
  }

  async delete(req, res) {
    const { id } = req.params;

    const productPhoto = await ProductPhoto.findOne({
      where: { id },
    });
    if (!productPhoto) {
      return res.status(404).json('Product photo not found.');
    }

    const { deleted_at } = await productPhoto.destroy();

    return res.json({ id, deleted_at });
  }

  async index(req, res) {
    const { product_id } = req.params;
    const category = await ProductPhoto.findAll({
      where: { product_id },
    });

    return res.json(category);
  }
}

export default new ProductPhotoController();
