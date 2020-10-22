import Sequelize from 'sequelize';

import Restaurant from '../app/models/Restaurant';
import RestaurantWorkPeriod from '../app/models/RestaurantWorkPeriod';
import Category from '../app/models/Category';
import Product from '../app/models/Product';
import ProductPhoto from '../app/models/ProductPhoto';
import ProductTablePrice from '../app/models/ProductTablePrice';

import databaseConfig from '../config/database';

const models = [
  Restaurant, RestaurantWorkPeriod, Category, Product, ProductPhoto, ProductTablePrice,
];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection));
  }
}

export default new DataBase();
