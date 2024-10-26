"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      churchId: {
        type: Sequelize.INTEGER,
      },
      serviceId: {
        type: Sequelize.INTEGER,
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      featureId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      canCreate: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      canRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      canUpdate: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      canDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
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
    await queryInterface.dropTable("Permissions");
  },
};
