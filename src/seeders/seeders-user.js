"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        email: "ducdepchai@gmail.com",
        phoneNumber: "0397879378",
        password: "ductato1",
        fullName: "Nguyễn Văn Đức",
        roleid: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "ngoc105@gmail.com",
        phoneNumber: "099999999",
        password: "ductato1",
        fullName: "Nguyễn Thị Ngọc",
        roleid: "user",
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
