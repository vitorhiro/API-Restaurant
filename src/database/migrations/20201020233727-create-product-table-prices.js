module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product_table_prices', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'restaurants', key: 'id' },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
      },
      regular_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      promotional_price: {
        type: Sequelize.DECIMAL,
      },
      promotional_price_description: {
        type: Sequelize.STRING,
      },
      promotional_price_start_at: {
        type: Sequelize.DATE,
      },
      promotional_price_end_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('product_table_prices'),
};
