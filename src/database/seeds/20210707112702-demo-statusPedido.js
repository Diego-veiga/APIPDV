module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'statusPedido',
      [
        {
          nome: 'Aberto',
          created_at: new Date(),
          updated_at: new Date(),

        },
        {
          nome: 'Finalizado',
          created_at: new Date(),
          updated_at: new Date(),

        },
        {
          nome: 'Cancelado',
          created_at: new Date(),
          updated_at: new Date(),

        },

      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('statusPedido', null, {});
  },
};
