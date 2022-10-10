const Group = require("./model/Group");
const User = require("./mongoDB");
const DatabaseMth = {
 
  CreateGroup: async function (groupData) {
    // groupData에는 그룹명이 포함되어 있음
    try {
      const group = await Group.create(groupData);
      console.log("Making new group is success");
      return group._id.toString();
    } catch (error) {
      console.log("Making new Group is fail in CreateGroup");
      return false;
    }
  },
  CreateMemberById: async function (groupId, userId) {
    try {
        const group = await Group.findById(groupId);
        console.log(group);
        group['members'].push(userId);
        const result = group.save();
        return result;
    } catch(error) {
        console.log("CreateMember is failed");
        return null;
    }
  },
  getGroupById: async function (id) {
    try {
      const group = await Group.findById(id);
      console.log("getGroupbyId user is : ", group);
      return group;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
 
  getGroupByField: async function (field, data) {
    const query = {};
    query[field] = data;
    const group = await Group.find(query);
    return group;
  },

  getMembersById: async function(id) {
    try {

        const result = await Group.find({_id : id});
        const member_list = [];
        const old_member_list = result[0]['members'];
        for (let i = 0; i < old_member_list.length; i++) {
            member_list.push(old_member_list[i].toString());
        }
        return member_list;

    } catch (error) {
        console.log('error ocurred in getMembersById');
        console.log('error');
        return null;
    }
  },
  updateGroupById: async function (id, groupData) {
    try {
      const updatedGroup = await Group.findByIdAndUpdate(id, groupData, {
        new: true,
      });
      return updatedGroup;
    } catch (error) {
      console.log("error is occured in updateGroupById");
      console.log(error);
      return null;
    }
  },

  deleteGroupById: async function (id) {
    try {
      const data = await Group.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log("error is occured in deleteUserbyGroup", error);
      return false;
    }
  },
}

module.exports = DatabaseMth;
