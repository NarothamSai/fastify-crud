const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  age: {type : Number},
  name : {type : String},
  rollno : {type: String},
  statusid:{type : Number, default : 1}
},
{
  timestamps: true
}
)

module.exports = mongoose.model('student',studentSchema);
