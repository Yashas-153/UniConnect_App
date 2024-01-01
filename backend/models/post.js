const {Sequelize,DataTypes } = require("sequelize");
const { comment } = require("./comment")
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
const post = sequelize.define("posts",{
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
})

post.hasMany(comment,{foreignKey:'postId'})
post.belongsTo(user,{foreignKey:'userId'})

post.sync()
module.exports = {post}