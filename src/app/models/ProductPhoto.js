import Sequelize, { Model } from 'sequelize';

class RestaurantWorkPeriod extends Model {
  static init(sequelize) {
    super.init(
      {
        restaurant_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER,
        path: Sequelize.STRING,
        thumb_path: Sequelize.STRING,
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      },
    );

    return this;
  }
}

export default RestaurantWorkPeriod;
