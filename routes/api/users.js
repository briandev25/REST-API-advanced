const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const User = require('../../models/users')

route.get('/', async (req,res) =>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({message:err})
    }
});

route.post('/',(req,res) =>{
    const user = new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      userName:req.body.userName,
      password:req.body.password
    })
    user.save().then(data =>{
        res.status(201).json(data)
    }).catch(err =>{
        res.status(500).json({
            message:err
        })
    })
});

//searching specific user

route.get('/:userId',async (req,res) =>{
    const id = req.params.userId;
    try{
         const specificUser = await User.findById(id);
         res.json(specificUser)
    }catch(err){
        res.status(500).json({
            message:err
        })
    }

})
route.delete('/:userId', async(req,res) =>{
    
    try{
          const removedUser =  User.remove({_id:req.params.userId});
          res.json(removedUser)
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
})
route.patch('/:userId', async(req,res) =>{
    
    try{
          const updatedUser =  User.updateOne(
              {_id:req.params.userId},
              {$set:{
                  userName : req.body.userName
              }}
              );
          res.json(updatedUser)
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
})
module.exports =route;