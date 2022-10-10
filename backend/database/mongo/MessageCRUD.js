const Message = require("./model/Message");

const DatabaseMth = {
  
  CreateMessage: async function (data) {
    try {
      const message = await Message.create(data);
      console.log("Making new Message is success");
      return message._id.toString();
    } catch (error) {
      console.log("Making new Message is fail in CreateMessage");
      return false;
    }
  },

  getMessagebyId: async function (id) {
    try {
      const message = await Message.findById(id);
      console.log("getMessagebyId message is : ", message);
      return message;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
 
  getMessagebyField: async function (field, data) {
    const query = {};
    query[field] = data;
    const message = await Message.find(query);
    return message;
  },

  updateMessageById: async function (id, data) {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedMessage;
    } catch (error) {
      console.log("error is occured in updateMessageById");
      console.log(error);
      return null;
    }
  },

  deleteMessageById: async function (id) {
    try {
      const data = await Message.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log("error is occured in deleteMessagebyId", error);
      return false;
    }
  },

};

module.exports = DatabaseMth;
