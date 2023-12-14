'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
        name: "super admin 1",
        email: "super@admin1.com",
        encryptedPassword: bcrypt.hashSync("super_admin111", 10),
        phone: "085880880880",
        addres: "kediri",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "super admin 2",
        email: "super@admin2.com",
        encryptedPassword: bcrypt.hashSync("super_admin222", 10),
        phone: "085880880880",
        addres: "kediri",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "super admin 3",
        email: "super@admin3.com",
        encryptedPassword: bcrypt.hashSync("super_admin333", 10),
        phone: "085880880880",
        addres: "kediri",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users', null, {})
  }
};
