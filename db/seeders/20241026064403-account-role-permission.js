"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pastor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Zone Leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Home Leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Core Team",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "New Comers",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "features",
      [
        {
          name: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Church",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Service",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cell",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Event",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          churchId: 1,
          serviceId: 1,
          roleId: 1,
          featureId: 1,
          canCreate: 1,
          canRead: 1,
          canUpdate: 1,
          canDelete: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          churchId: 1,
          serviceId: 1,
          roleId: 1,
          featureId: 2,
          canCreate: 1,
          canRead: 1,
          canUpdate: 1,
          canDelete: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          churchId: 1,
          serviceId: 1,
          roleId: 1,
          featureId: 3,
          canCreate: 1,
          canRead: 1,
          canUpdate: 1,
          canDelete: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          churchId: 1,
          serviceId: 1,
          roleId: 1,
          featureId: 4,
          canCreate: 1,
          canRead: 1,
          canUpdate: 1,
          canDelete: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          churchId: 1,
          serviceId: 1,
          roleId: 1,
          featureId: 5,
          canCreate: 1,
          canRead: 1,
          canUpdate: 1,
          canDelete: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("features", null, {});
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
