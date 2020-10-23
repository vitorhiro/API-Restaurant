module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('restaurant_photos', {
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
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      thumb_path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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

  down: (queryInterface) => queryInterface.dropTable('restaurant_photos'),
};
