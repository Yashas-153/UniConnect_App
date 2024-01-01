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
const comment = sequelize.define("comments",{
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    text:{
      type:DataTypes.STRING,
      allowNull:false
    }   
})
comment.belongsTo(user,{foreignKey:'userId'})
comment.sync()
module.exports = {comment}