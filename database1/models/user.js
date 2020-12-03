'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      this.hasMany(models.Followers, {
        foreignKey: 'followedId',
        as: 'followers',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Followers, {
        foreignKey: 'followerId',
        as: 'following',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Comment,{
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Like,{
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      
      User.belongsToMany(models.Conversation,{
        through: 'UserConversations' 
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    description: DataTypes.STRING,
    isActif: DataTypes.BOOLEAN,
    profileImage: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    messageId: DataTypes.STRING  ,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};