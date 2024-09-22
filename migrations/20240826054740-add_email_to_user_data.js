module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('user_data');
    if (!table.email) {
      await queryInterface.addColumn('user_data', 'email', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_data', 'email');
  }
};
