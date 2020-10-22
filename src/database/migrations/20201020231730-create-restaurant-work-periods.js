module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('restaurant_work_periods', {
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
    week_day: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    start_hour: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    end_hour: {
      type: Sequelize.STRING,
      allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable('restaurant_work_periods'),
};
