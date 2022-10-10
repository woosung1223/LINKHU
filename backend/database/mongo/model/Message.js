const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageSchema = new Schema({
  isRead: {
    type: Boolean,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
},
  receiver: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
},

});


module.exports = mongoose.model("Message", messageSchema);