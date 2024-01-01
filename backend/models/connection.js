const {Sequelize,DataTypes } = require("sequelize");
const {user} = require("./user")
const sequelize = new Sequelize(
  'lpuapp',
  'root',
  'password',
   {
     host: '127.0.0.1',
     dialect: 'mysql'
   }
);

const connection = sequelize.define("connections",{
    reqId:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    senderId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    receiverId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("pending","accepted"),
        defaultValue: "pending"
    }
})

connection.hasMany(user,{foreignKey:"userId"});
connection.sync();
module.exports = {connection,sequelize};
