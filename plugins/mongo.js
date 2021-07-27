'use strict'
const mongoose = require("mongoose");
const fp = require('fastify-plugin')
//
// module.exports = fp(async function(fastify,opts){
//   fastify.register(require('fastify-mongodb'),{
//       forceClose: true,
//       url: process.env.MONGODB_URL
//   })
// })

module.exports = fp(async function(fastify,opts){
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected',()=>{
    fastify.log.info('Server connected to mongoDB');
  })
  mongoose.connection.on('error',err=>{
    fastify.log.error(err);
  })
})
