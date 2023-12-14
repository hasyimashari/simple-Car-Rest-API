'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('cars', 'createdBy', {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    });

    await queryInterface.addColumn('cars', 'updatedBy', {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    });

    await queryInterface.addColumn('cars', 'deletedBy', {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('cars', 'createdBy', {});
    await queryInterface.removeColumn('cars', 'updatedBy', {});
    await queryInterface.removeColumn('cars', 'deletedBy', {});
  }
};
