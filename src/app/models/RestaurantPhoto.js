import Sequelize, { Model } from 'sequelize';

class RestaurantPhoto extends Model {
  static init(sequelize) {
    super.init(
      {
        restaurant_id: Sequelize.INTEGER,
        path: Sequelize.STRING,
        thumb_path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return !this.path
              ? null
              : `${process.env.APP_URL}/files/${this.path}`;
          },
        },
        thumb_url: {
          type: Sequelize.VIRTUAL,
          get() {
            return !this.thumb_path
              ? null
              : `${process.env.APP_URL}/files/${this.thumb_path}`;
          },
        },
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

export default RestaurantPhoto;
