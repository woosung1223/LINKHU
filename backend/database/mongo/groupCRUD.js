const Group = require("./model/Group");
const User = require("./UserCRUD");

const DatabaseMth = {
 
  createGroup: async function (groupName) {
    try {
      const group = await Group.create(groupName);
      return group._id.toString();
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  createMemberById: async function (groupId, userId) {
    try {
        const group = await Group.findById(groupId);
        group['members'].push(userId);
        const result = await group.save();
        return result;
    } catch(error) {
        console.log(error);
        return false;
    }
  },

  getGroupById: async function (id) {
    try {
      const group = await Group.findById(id);
      return group;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
 
  getGroupByField: async function (field, data) {
    try {
      const query = {};
      query[field] = data;
      const group = await Group.find(query);
      return group;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getMembersById: async function(id) {
    try {
      const result = await Group.find({_id : id});
      const member_list = [];
      const old_member_list = result[0]['members'];

      for (let member in old_member_list) {
        member_list.push(member.toString());
      }

        return member_list;
    } catch (error) {
        console.log(error);
        return false;
    }
  },
  updateGroupById: async function (id, groupData) {
    try {
      const updatedGroup = await Group.findByIdAndUpdate(id, groupData, {
        new: true,
      });
      return updatedGroup;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  deleteGroupById: async function (id) {
    try {
      const deletedGroup = await Group.findByIdAndDelete(id);
      return deletedGroup;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}

module.exports = DatabaseMth;
