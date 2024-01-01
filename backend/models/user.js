const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  'lpuapp',
  'root',
  'password',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully in profiles in users');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const user = sequelize.define("users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address is already in use.'
      },
      validate: {
        isEmail: {
          msg: "Enter a valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Password should be a minimum length of 6"
        }
      }
    },
    regno:{
        type:DataTypes.INTEGER,
        validate:{
            len:{
                args:[8],
                msg:"Registration Number should be of length 8"
            }
        }
    }
    
  });

user.sync()
module.exports = { user };
