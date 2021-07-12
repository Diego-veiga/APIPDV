module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('item', 'total', { type: Sequelize.FLOAT });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('item', 'total');
  },
};
