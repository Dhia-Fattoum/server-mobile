'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      })
    }
  };
  Media.init({
    fileUrl: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    isVideo: DataTypes.BOOLEAN,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};