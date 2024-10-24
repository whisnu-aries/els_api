"use strict";
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          uuid: await uuidV4(),
          email: "super_admin@els.id",
          password: await bcrypt.hash("password", 10),
          verifiedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          accountId: 1,
          uuid: await uuidV4(),
          name: "Super Admin",
          birthday: new Date(),
          phoneNumber: "081212341234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Accounts", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
