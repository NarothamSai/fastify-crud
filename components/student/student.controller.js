const Student = require("./student.model");
const qs = require('qs')
module.exports = {

  create: async function(req,reply){
    try{
      const student = req.body;
      const newStudent = await Student.create(student);

      reply.code(201).send({student : newStudent});
    }catch(err){
      req.log.error(err);
      reply.code(500).send(err);
    }
  },

  getAll: async function(req,reply){
    try{

      let filter = {};
      try{
        filter = await JSON.parse(req.query.filter);
        filter.sort = filter.order;
      }catch(err){
        req.log.error(err);
      }

      // const student = await Student.find(filter);
      const student = await Student.findWithFilters(filter.where,
                          filter.limit,filter.skip,filter.sort);
      reply.code(200).send({students: student});
    }catch(err){
      req.log.error(err);
      reply.code(500).send(err);
    }
  },

  getOne: async function(req,reply){
    try{
      const _id = req.params._id;
      const student = await Student.findById(_id);

      reply.code(200).send({student: student});
    }catch(err){
      req.log.error(err);
      reply.code(500).send(err);
    }
  },

  putOne: async function(req,reply){
    try{
      const _id = req.params._id;
      const updates = req.body;
      const student = await Student.findOneAndReplace({_id: _id},updates,{new:true});

      reply.code(200).send({student: student});
    }catch(err){
      req.log.error(err);
      reply.code(500).send(err);
    }
  },

  patchOne: async function(req,reply){
    try{
      const _id = req.params._id;
      const updates = req.body;
      const student = await Student.findByIdAndUpdate(_id,{$set:updates},{new:true});

      reply.code(200).send({student: student});
    }catch(err){
      req.log.error(err);
      reply.code(500).send(err);
    }
  },

  deleteOne: async function(req,reply){
    try{
      const _id = req.params._id;
      const student = await Student.findByIdAndRemove(_id);

      reply.code(200).send({student: student});
    }catch(err){
      req.log.error(err);
      reply.code(500).send(err);
    }
  }

}
