import Sequelize, { Model } from 'sequelize';

class ProductTablePrice extends Model {
  static init(sequelize) {
    super.init(
      {
        restaurant_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER,
        regular_price: Sequelize.DECIMAL,
        promotional_price: Sequelize.DECIMAL,
        promotional_price_description: Sequelize.STRING,
        promotional_price_start_at: Sequelize.DATE,
        promotional_price_end_at: Sequelize.DATE,
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      }
    );

    return this;
  }
}

export default ProductTablePrice;
