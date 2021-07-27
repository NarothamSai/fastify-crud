'use strict'
const Student = require("../../components/student/index");

const StudentSchema = {
    name : {type : 'string'},
    age : {type : 'integer'}
}

const postOpts = {
  schema :{
    body : StudentSchema
  },
  response:{
    201: {
      type: 'object',
      properties:{
        studentCreatedId: {type : 'string'}
      }
    }
  }
}

const getOpts = {
  response:{
    200:{
      type: 'object',
      properties:{
        student:{
          type : 'array',
          items : StudentSchema
        }
      }
    }
  }
}

const putOpts = {
  schema :{
    params:{
      type: 'object',
      properties:{
        _id: {type : 'string', minLength: 12}
      },
      required: ['_id']
    },
    body : StudentSchema
  },
  response:{
    200: {
      type: 'object',
      properties:{
        matchedCount: {type : 'string'},
        modifiedCount: {type : 'string'}
      }
    }
  }
}

const deleteOpts = {
  schema :{
    params:{
      type: 'object',
      properties:{
        _id: {type : 'string', minLength: 12}
      },
      required: ['_id']
    }
  },
  response:{
    200: {
      type: 'object',
      properties:{
        deletedCount: {type : 'string'}
      }
    }
  }
}

module.exports = async function(fastify,opts){

  fastify.post("/",postOpts,Student.Controller.create);

  fastify.get("/:_id",getOpts,Student.Controller.getOne);

  fastify.get("/",getOpts,Student.Controller.getAll);

  fastify.put("/:_id", putOpts,Student.Controller.putOne);

  fastify.patch("/:_id", putOpts,Student.Controller.patchOne);

  fastify.delete("/:_id",deleteOpts,Student.Controller.deleteOne);
}
