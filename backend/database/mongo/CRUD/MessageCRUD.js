const Message = require("../model/Message");

const DatabaseMth = {

  createMessage: async function (data) {
    try {
      const message = await Message.create(data);
      return message._id.toString();
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getMessagebyId: async function (id) {
    try {
      const message = await Message.findById(id);
      return message;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
 
  getMessagebyField: async function (field, data) {
    try {
      const query = {};
      query[field] = data;
      const message = await Message.find(query);
      return message;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateMessageById: async function (id, data) {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(id, data, {
      new: true,
      });
      return updatedMessage;
    } catch (error) {
      console.log(error);
      return ;
    }
  },

  deleteMessageById: async function (id) {
    try {
      const deletedMessage = await Message.findByIdAndDelete(id);
      return deletedMessage;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = DatabaseMth;
