import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Restaurant extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        number: Sequelize.INTEGER,
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

    this.addHook('beforeSave', async (restaurant) => {
      if (restaurant.password) {
        restaurant.password_hash = await bcrypt.hash(restaurant.password, 8);
      }
    });

    return this;
  }
}

export default Restaurant;
