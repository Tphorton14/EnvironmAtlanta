module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
    
    Post.associate = function(models) {
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })

    }
    return Post;
  };