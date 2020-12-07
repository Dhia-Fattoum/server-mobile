'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      isActif: {
        type: Sequelize.BOOLEAN
      },
      profileImage: {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/vic2021/image/upload/v1606473759/Avatar/avatardefault_92824_pn2wp0.png'
      },
      coverImage: {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/vic2021/image/upload/v1606473818/Cover%20Image/images_f23o3w.jpg'
      },
      messageId: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};