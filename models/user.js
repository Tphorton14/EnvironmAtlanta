module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     validate: {
        //         len: [6, 8]
        //     }
        // },
        // city: {
        //     type: DataTypes.STRING,
        //     defaultValue: "Atlanta",
        //     allowNull : true
        // },
        // zipCode: {
        //     type: DataTypes.INTEGER,
        //     defaultValue: 30328
        // }
    });

     
    User.associate = function(models) {
        this.hasMany(models.Post, {
         

        })
  
      }

    return User;
};
