'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      
    }),
    Post.hasMany(models.Like, {
      foreignKey: 'postId'
    }),
    Post.hasMany(models.Comment, {
      foreignKey:'postId'
    })
  }
  };
  Post.init({
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    fileUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

