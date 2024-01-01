const bcrypt = require("bcrypt")
const {user} = require("../models/user")

module.exports. signup = async (req,res)=>{

    const {username, email, password, regno} = req.query;
    console.log(req.query)
    try{
        // const check = await user.findOne({where:{email:email}})
        // if(check){
        //     throw Error("Email already exist")
        // }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const User = await user.create({
            username:username,
            email:email,
            password:hashPassword,
            regno:regno,
        })
        res.json({
            userId: User.userId,
            userName:User.username,
        });   
    }
    catch(err){
       res.status(400).json({err:err});
    }
   }

module.exports.signin = async (req,res)=>{
    const {email,password} = req.query;
    try{
        const User = await user.findOne({ where: { email: email } });
        if (!User) 
            throw Error("Invalid Email")   
        // const match = await bcrypt.compare(password,User.password)
        // const token = createToken(User.userId)
        const match = User.password === password;
        if(!match)
            throw Error("Invalid Password")
        res.json({msg:"logged in",userId: User.userId,username :User.username})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
} 