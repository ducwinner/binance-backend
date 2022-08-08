"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("fortfolios", [
      {
        userId: 1,
        coinId: "bitcoin",
        quantity: 5,
        priceInput: 36542,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        coinId: "bitcoin",
        quantity: 3,
        priceInput: 45000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        coinId: "link",
        quantity: 1230,
        priceInput: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
