import path from 'path';
import RestaurantPhoto from '../models/RestaurantPhoto';

class RestaurantPhotoController {
  async store(req, res) {
    const { restaurant_id } = req.params;
    const photoPath = `product_${path.parse(req.file.path).name}.jpeg`;
    const thumbPath = `product_${path.parse(req.file.path).name}_thumb.jpeg`;

    const restaurantPhoto = await RestaurantPhoto.create({
      restaurant_id,
      path: photoPath,
      thumb_path: thumbPath,
    });

    return res.json(restaurantPhoto);
  }

  async show(req, res) {
    const { id } = req.params;
    const restaurantPhoto = await RestaurantPhoto.findOne({
      where: { id },
    });

    if (!restaurantPhoto) {
      return res.status(404).json('Restautant photo not found.');
    }
    return res.json(restaurantPhoto);
  }

  async update(req, res) {
    const { id } = req.params;
    const photoPath = `product_${path.parse(req.file.path).name}.jpeg`;
    const thumbPath = `product_${path.parse(req.file.path).name}_thumb.jpeg`;

    let restaurantPhoto = await RestaurantPhoto.findOne({ where: { id } });
    if (!restaurantPhoto) {
      return res.status(404).json('Restaurant photo not found.');
    }

    restaurantPhoto = await restaurantPhoto.update({
      path: photoPath,
      thumb_path: thumbPath,
    });

    return res.json(restaurantPhoto);
  }

  async delete(req, res) {
    const { id } = req.params;

    const restaurantPhoto = await RestaurantPhoto.findOne({ where: { id } });
    if (!restaurantPhoto) {
      return res.status(404).json('Restaurant photo not found.');
    }

    const { deleted_at } = await restaurantPhoto.destroy();

    return res.json({ id, deleted_at });
  }

  async index(req, res) {
    const { restaurant_id } = req.params;
    const restaurantPhotos = await RestaurantPhoto.findAll({
      where: { restaurant_id },
    });

    return res.json(restaurantPhotos);
  }
}

export default new RestaurantPhotoController();
