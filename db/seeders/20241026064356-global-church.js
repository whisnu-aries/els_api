"use strict";
const { v4: uuidV4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Churches",
      [
        {
          uuid: uuidV4(),
          slug: "global",
          name: "global",
          address: "global",
          lat: 0,
          lon: 0,
          description: "This is global church.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Churches", null, {});
  },
};
