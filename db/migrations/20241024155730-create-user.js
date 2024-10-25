"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
        defaultValue: "Male",
      },
      status: {
        type: Sequelize.ENUM("Single", "Married", "Divorced", "Widowed"),
        defaultValue: "Single",
      },
      address: {
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
