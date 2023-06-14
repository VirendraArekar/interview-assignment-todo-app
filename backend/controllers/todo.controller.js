const httpStatus = require('http-status');
const { omit } = require('lodash');
const Task = require('../models/task.model');
const { omitBy, isNil } = require('lodash');


exports.get = async(req, res, next) => {
    try{
        const task = await Task.findOne({_id : req.params.id});
        res.status(200).send({code : 200, message : 'Task retrieve successfully.', data : task});
      }
      catch(err){
        next(err);
      }
};


exports.create = async (req, res, next) => {
  try{
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(200).send({code : 200, message : 'Task created successfully.', data : savedTask});
  }
  catch(err){
    next(err);
  }
};



exports.update = async(req, res, next) => {
    try{
        const task = await Task.updateOne({_id : req.params.id} , req.body)
                     .then(async(getTask) => {
                        let findTask = await Task.find({_id : req.params.id});
                        res.status(200).send({code : 200, message : 'Task updated successfully.', data : findTask});
                     })
                     .catch((err) => {
                        res.status(400).send({code : 400, message : 'Task not found.', data : err});
                     })
      
      }
      catch(err){
        next(err);
      }
};


exports.list = async (req, res, next) => {
 try{
 
    const tasks = await Task.list(req.query);
    res.status(200).send({code : 200, message : 'Task list retrieved', data : tasks});
 }
 catch(err){
    next(err);
 }
};

exports.remove = async(req, res, next) => {
    try{
      let deleteTask = await Task.deleteOne({_id : req.params.id})
            .then((data) => {
                res.status(200).send({code : 200, message : 'Task deleted successfully.', data : {}})
            })
            .catch((err) => {
                res.status(400).send({code: 400, message : 'Internal server error', data : err});
            })
    }
    catch(err){
      next(err);
    }
};
