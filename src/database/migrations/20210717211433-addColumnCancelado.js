module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('item', 'cancelado', { type: Sequelize.BOOLEAN });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('item', 'cancelado');
  },
};
