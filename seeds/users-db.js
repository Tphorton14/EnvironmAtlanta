const db= require("../models");
const users = [
    {
        name: "qwerty",
        userName: "qwe@gmail.com",
        password: "qwertyui",
        city: "Atlanta",
        zipcode: 30318
    },
    {
        name: "asdfgh",
        userName: "asd@gmail.com",
        password: "asdfghjkl",
        city: "Atlanta",
        zipcode: 30318
    }
]
db.sequelize.sync({ force: true }).then(function() {
    db.User.bulkCreate(users)
      .then(function(rows) {
        console.log(`\n${rows.length} Rows Inserted`);
      })
      .catch(function(err) {
        console.log('\nError:', err);
      });
   });