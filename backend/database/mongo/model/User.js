const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageLoc: {
    type: String,
  }
});

//Create, update등이 일어날 때 만약 document의 password값이 바뀌었을 경우에 해당 password를 hash해주는 함수
//password를 변환 안해주고 원본 password만 제공해도 자동으로 암호화 되어서 저장됨
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

module.exports = mongoose.model("User", userSchema);