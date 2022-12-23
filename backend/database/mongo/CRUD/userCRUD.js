const User = require("../model/User");
//mongoDatabase의 경우 기존 mongoose랑 형태가 비슷함 후에 다른 db로 바꿀 경우 해당 method안의 내용을 바꿈
const DatabaseMth = {
  //
  //CRUD - Create
  //

  //유저의 정보를 userData를 통해서 받고 DB에 저장한다. 성공시 만들어진 data의 ID를 반환하며 실패시 false를 반환한다.
  CreateUser: async function (userData) {
    try {
      const user = await User.create(userData);
      return user._id.toString();
    } catch (error) {
      console.log("Making new User is fail in CreateUser");
      return false;
    }
  },
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //
  //CRUD - Read
  //

  //User의 정보를 기본키인 id를 통해서 반환 받는 함수
  //성공시 온전한 User 데이터를 받고 실패시 null값을 반환한다
  getUserbyId: async function (Id) {
    try {
      const user = await User.findById(Id);
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  //필드값과 데이터를 받고 field에 해당 data를 가지는 데이터가 있으면 배열에 넣은 user데이터들 반환
  //만약 없을 시 빈 array 반환
  getUserbyField: async function (field, data) {
    const query = {};
    query[field] = data;
    const user = await User.find(query);
    return user;
  },

  //User의 정보를 기본키인 id를 통해서 반환 받는 함수
  //성공시 message 내용이 포함된 User 데이터를 받고 실패시 null값을 반환한다
  getUserAndMessagebyId: async function (Id) {
    try {
      const user = await User.findById(Id)
        .populate("sendmessage")
        .populate("receivemessage");
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  //필드값과 데이터를 받고 field에 해당 data를 가지는 데이터가 있으면 Message가 포함된 데이터를 배열에 넣은 user데이터들 반환
  //만약 없을 시 빈 array 반환
  getAndMessagebyField: async function (field, data) {
    const query = {};
    query[field] = data;
    const user = await User.find(query)
      .populate("sendmessage")
      .populate("receivemessage");
    return user;
  },

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //
  //CRUD - Update
  //

  //id값에 해당되는 데이터의 값을 변경하는 함수
  //userdata에 들어있는 field에 대한 값만 변경함
  updateUserById: async function (id, userdata) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, userdata, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      console.log("error is occured in updateById");
      console.log(error);
      return null;
    }
  },

  //보낸 messageid와 userid를 받아서 message를 user의 발신함에 추가하는 역할을 한다.
  AddSendMessage: async function (messageId, userId) {
    try {
      const user = await User.findById(userId);
      user.sendmessage.push(messageId);
      const result = await user.save();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  //받은 messageid와 userid를 받아서 message를 user의 수신함에 추가하는 역할을 한다.
  AddReceiveMessage: async function (messageId, userId) {
    try {
      const user = await User.findById(userId);
      user.receivemessage.push(messageId);
      const result = await user.save();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  //해당 유저의 발신함에서 message를 id기반으로 삭제한다.
  DeleteSendMessage: async function (messageId, userId) {
    try {
      const user = await User.findById(userId);
      const messageifilter = user.sendmessage.filter(function (data) {
        return String(data) !== String(messageId);
      });
      user.sendmessage = messageifilter;
      const result = await user.save();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  //해당 유저의 수신함에서 message를 id기반으로 삭제한다.
  DeleteReceiveMessage: async function (messageId, userId) {
    try {
      const user = await User.findById(userId);
      const messageifilter = user.receivemessage.filter(function (data) {
        return String(data) !== String(messageId);
      });
      user.sendmessage = messageifilter;
      const result = await user.save();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //
  //CRUD - Delete
  //

  deleteUserById: async function (id) {
    try {
      const data = await User.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log("error is occured in deleteUserbyId", error);
      return false;
    }
  },
};

module.exports = DatabaseMth;
