'use strict';
const { faker } = require('@faker-js/faker');
const { user } = require('../../app/models')

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

    const getRandomUser = await user.findOne({
      where: {role: 'superadmin'},
      order: Sequelize.literal('random()') 
    });
    const randomID = getRandomUser.dataValues.id;

    const dummCarData = [...Array(25)].map(() => (
      {
        "name": `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
        "type": faker.helpers.arrayElement(['small', 'medium', 'large']),
        "image": faker.image.url(),
        "rentPerDay": faker.number.bigInt({min: 10000, max:1000000}),
        "capacity": faker.number.int({min:2 ,max: 8}),
        "description": faker.lorem.sentence({ min: 5, max: 10 }),
        "availableAt": faker.date.soon(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "createdBy" : randomID
      }
    ));

    return queryInterface.bulkInsert('cars', dummCarData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('cars', null, {})
  }
};
