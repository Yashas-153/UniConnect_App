const {post} = require("../models/post");
const {comment} = require("../models/comment")
const {user} = require("../models/user")
module.exports.createNewPost = async (req,res)=>{
    const {userId, title,description} = req.query;
    newPost = await post.create({
        userId,
        title,
        description
    });
    res.json({msg:"created post"});
}

module.exports.getAllPost = async(req,res)=>{
    const records = await post.findAll({
        include:[{
            model:user,
            attributes:["username"]
        },{
            model:comment,
            include:[{
                model:user,
                attributes:["username"]
            }]
        }]   
    })
    let posts = []
    records.forEach(row=>{
        const post = JSON.parse(JSON.stringify(row,null,2));
        posts.push(post); 
    })
    res.json({posts});
}

module.exports.addComment = async (req,res)=>{
    const {postId,userId,text} = req.query;
    try{
        const response = await comment.create({
            postId,
            userId,
            text
        });
    }
    catch(err){
        res.status(400).json({err:"Error occured"})
    } 
    res.json({msg:"added comment"});
}

module.exports.getComments = async (req,res)=>{
    const postId = parseInt(req.headers.id);
    console.log("postId is ",postId)
    const records = await comment.findAll({where :{postId:3}})
    let comments = []
    records.forEach(row=>{
        comments.push(row.dataValues);
    })
    res.json({comments})
}