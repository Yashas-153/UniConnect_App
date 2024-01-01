const { ConnectParticipant } = require("aws-sdk");
const {connection,sequelize} = require("../models/connection");
const { user } = require("../models/user");
const { Op, Sequelize } = require('sequelize');
// const {sequelize}= require("../models/connection")

module.exports.sendConnectionRequest = async(req,res)=>{
    const {senderId, receiverId} = req.query;
    console.log(req.query)
    try{
        const response = await connection.create({
            senderId:parseInt(senderId),
            receiverId:parseInt(receiverId)
        })

        res.json({msg:"Request sent"});
    }
    catch(err){
        res.json({err:err.message});
    }
}
module.exports.cancelConnectionRequest = async(req,res)=>{
    const {senderId, receiverId} = req.query;
    try{
        console.log(req.query)
        const record = await connection.findOne({
            where: {
                senderId: senderId,
                receiverId: receiverId,
            },
        });
        if (!record) {
            return res.status(404).json({ msg: 'Connection request not found' });
        }
        await record.destroy();
        res.json({msg:"Request Cancelled"})
    }
    catch(err){
        res.json({err:err.message});
    }
}

module.exports.acceptConnectionRequest = async (req,res)=>{
    const {senderId,receiverId} = req.query;
    try{
        const record = await connection.findOne({where : {
            senderId:senderId,
            receiverId:receiverId
        }})
        console.log(record.dataValues)
        await record.update({status:"accepted"})
        res.json({msg:"Accepted Request"});
    }
    catch(err){
        res.status(400).json({err:err.message});
    }
}

module.exports.getAllConnections = async (req,res)=>{
    const userId = req.headers.userid;
    console.log(req.headers.userid)
    try{
        const sqlQuery1 = `select connections.senderId, connections.receiverId, users.username
        from connections left outer join users on connections.receiverId = users.userId
        where connections.receiverId != ${userId} and connections.status = "accepted";
        `
        const sqlQuery2 = `select connections.senderId, connections.receiverId, users.username
        from connections left outer join users on connections.senderId = users.userId
        where connections.senderId!= ${userId} and connections.status = "accepted";
        `
        let connections = []
        const records1 = await sequelize.query(sqlQuery1, { type: sequelize.QueryTypes.SELECT })
        const records2 = await sequelize.query(sqlQuery2, { type: sequelize.QueryTypes.SELECT })
        
        console.log(records1)
        records1.forEach(row=>{
            connections.push({userId:row.receiverId,username:row.username});
        }) 
        records2.forEach(row=>{
            connections.push({userId:row.senderId,username:row.username});
        })        
        res.json(connections)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({msg:err.message})
    }
}

module.exports.getPendingConnections = async (req,res)=>{
    const userId = req.headers.userid;
    console.log(req.headers)
    try{
        const sqlQuery = `select connections.receiverId, users.username
        from connections inner join users on connections.receiverId = users.userId
        where connections.senderId = ${userId} and connections.status = "pending" `
        const records = await sequelize.query(sqlQuery,{ type: sequelize.QueryTypes.SELECT })
        console.log(records)
        
        res.json({records})
    }
    catch(err){
        res.status(400).json({msg:err.message});
    }

}

module.exports.getPendingInvitations = async (req,res)=>{
    const userId = req.id;
    try{
        const records = await sequelize.query(`select connections.senderId, users.username
        from connections left outer join users on connections.receiverId = users.userId
        where connections.receiverId = ${userId} and connections.status = "pending"`)
        
        res.json({records})
    }
    catch(err){
        res.status(400).json({msg:err.message});
    }
}