'use strict'
const Student = require("../../components/student/index");

const StudentSchema = {
    name : {type : 'string'},
    age : {type : 'integer'},
    rollno: {type: 'string'}
}

const StudentResponse = {
  type : 'object',
  properties : {
    _id : {type : 'string'},
    name : {type : 'string'},
    age : {type : 'integer'},
    rollno: {type: 'string'},
    statusid: {type : 'integer'},
    createdAt: {type: 'string'},
    updatedAt: {type: 'string'}
  }
}

const ErrorResponse = {
  "statusCode":  {type : 'integer'},
  "error": {type: 'string'},
  "message": {type: 'string'}
}

const postOpts = {
  schema :{
    "body" : {
      "type": 'object',
      "required": ['name', 'age', 'rollno'],
      "additionalProperties": false,
      "properties":{
        "name" : {type : 'string'},
        "age" : {type : 'integer'},
        "rollno": {type: 'string'}
      }
    },
    "response":{
      201: {
        "type": 'object',
        properties:{
          student: StudentResponse
        }
      },
      '4xx': {
        "type": 'object',
        properties : ErrorResponse
      },
      '5xx': {
        "type": 'object',
        properties : ErrorResponse
      }
    }
  }
}

const getOpts = {
  schema : {
    response:{
      200:{
        type: 'object',
        properties:{
          count : {type : 'integer'},
          pagination_data:{
            type : 'array',
            items : StudentResponse
          }
        }
      },
      '4xx': {
        "type": 'object',
        properties : ErrorResponse
      },
      '5xx': {
        "type": 'object',
        properties : ErrorResponse
      }
    }
  }
}

const getOneOpts = {
  schema : {
    params:{
      type: 'object',
      properties:{
        _id: {type : 'string', minLength: 12}
      },
      required: ['_id']
    },
    "response":{
      200: {
        "type": 'object',
        properties:{
          student: StudentResponse
        }
      },
      '4xx': {
        "type": 'object',
        properties : ErrorResponse
      },
      '5xx': {
        "type": 'object',
        properties : ErrorResponse
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
    "body" : {
      "type": 'object',
      "required": ['name', 'age', 'rollno'],
      "additionalProperties": false,
      "properties":{
        "name" : {type : 'string'},
        "age" : {type : 'integer'},
        "rollno": {type: 'string'}
      }
    },
    "response":{
      200: {
        "type": 'object',
        properties:{
          student: StudentResponse
        }
      },
      '4xx': {
        "type": 'object',
        properties : ErrorResponse
      },
      '5xx': {
        "type": 'object',
        properties : ErrorResponse
      }
    }
  }
}

const patchOpts = {
  schema :{
    params:{
      type: 'object',
      properties:{
        _id: {type : 'string', minLength: 12}
      },
      required: ['_id']
    },
    "body" : {
      "type": 'object',
      "additionalProperties": false,
      "properties":{
        "name" : {type : 'string'},
        "age" : {type : 'integer'},
        "rollno": {type: 'string'}
      }
    },
    "response":{
      200: {
        "type": 'object',
        properties:{
          student: StudentResponse
        }
      },
      '4xx': {
        "type": 'object',
        properties : ErrorResponse
      },
      '5xx': {
        "type": 'object',
        properties : ErrorResponse
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
    },
    "response":{
      200: {
        "type": 'object',
        properties:{
          student: StudentResponse
        }
      },
      '4xx': {
        "type": 'object',
        properties : ErrorResponse
      },
      '5xx': {
        "type": 'object',
        properties : ErrorResponse
      }
    }
  }
}

module.exports = async function(fastify,opts){

  fastify.post("/",postOpts,Student.Controller.create);

  fastify.get("/:_id",getOneOpts,Student.Controller.getOne);

  fastify.get("/",getOpts,Student.Controller.getAll);

  fastify.put("/:_id", putOpts,Student.Controller.putOne);

  fastify.patch("/:_id", patchOpts,Student.Controller.patchOne);

  fastify.delete("/:_id",deleteOpts,Student.Controller.deleteOne);
}
