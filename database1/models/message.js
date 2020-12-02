'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    })
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
    })
  }
}
  Message.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    conversationId: DataTypes.INTEGER,
    fileUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};