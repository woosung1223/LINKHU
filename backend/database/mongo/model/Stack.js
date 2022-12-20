const mongoose = require("mongoose");
const { Schema } = mongoose;
const stackSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mento: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  menti: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Stack = mongoose.model("Stack", stackSchema);
export default Stack;
