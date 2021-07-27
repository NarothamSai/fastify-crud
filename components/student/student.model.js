const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  age: {type : Number},
  name : {type : String},
  rollno : {type: String}
  },
  {
    timestamps: true
  }
)

studentSchema.statics.findWithFilters= function(where={}, limit = 10, skip = 0, order=""){
  console.log(order)
  return this.find(where).sort(order).skip(skip).limit(limit);
}

module.exports = mongoose.model('student',studentSchema);
