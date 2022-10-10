import Stack from "./model/Stack";

const StackMethod = {
  //
  //CRUD - Create
  //

  //만들고자 하는 Stack의 이름을 입력 받으며 성공시 생성된 stack의 id을 반환해준다.
  CreateStack: async function (stackname) {
    try {
      const stack = await Stack.create({ name: stackname });
      return stack._id.toString();
    } catch (error) {
      console.log("Making new Stack generate error");
      return false;
    }
  },
  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //
  //CRUD - Read
  //

  //Stack의 고유 id값을 입력받아 Stack 내에 있는 유저들의 정보를 반환해주는 함수 실패시 null을 반환한다.
  StackMembmers: async function (Id) {
    try {
      const memebers = await Stack.findById(Id)
        .populate("mento")
        .populate("menti");
      return memebers;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //
  //CRUD - Update
  //

  //user의 고유 _id값과 Stack의 고유 _id값을 입력 받으며 해당 stack에 user를 등록한다.
  StackRegister: async function (stackId, userId) {
    try {
      const stack = await Stack.findById(stackId);
      stack.menti.push(userId);
      const result = stack.save();
      return result;
    } catch (error) {
      console.log("Error is occured in StackRegister");
      console.log(error);
      return null;
    }
  },

  //user의 고유 _id값과 Stack의 고유 _id값을 입력 받으며 해당 user를 stack내의 mentor로 등록한다. menti로 등록되었을 경우 menti에서는 삭제된다.
  MentorRegister: async function (stackId, userId) {
    try {
      const stack = await Stack.findById(stackId);
      const Mentifilter = stack.menti.filter(function (data) {
        return String(data) !== String(userId);
      });
      stack.menti = Mentifilter;
      stack.mento.push(userId);
      const result = stack.save();
      return result;
    } catch (error) {
      console.log("Error is occured in MentorRegister");
      console.log(error);
      return null;
    }
  },

  //-------------------------------------------------------------------------
  //-------------------------------------------------------------------------
  //
  //CRUD - Delete
  //

  DeleteMember: async function (stackId, userId) {
    try {
      const stack = await Stack.findById(stackId);
      if (stack.menti.find((memeber) => memeber === userId)) {
        console.log("menti detected");
        const Mentifilter = stack.menti.filter(function (data) {
          return String(data) !== String(userId);
        });
        stack.menti = Mentifilter;
      }
      if (stack.mento.find((memeber) => memeber === userId)) {
        console.log("mento detected");
        const Mentofilter = stack.mento.filter(function (data) {
          return String(data) !== String(userId);
        });
        stack.mento = Mentofilter;
      }
      const result = stack.save();
      return result;
    } catch (error) {
      console.log("error is occured in deleteUserbyId", error);
      return false;
    }
  },

  //해당 스택을 삭제해버리는 method
  DeleteStack: async function (stackId) {
    try {
      const result = await Stack.findByIdAndDelete(stackId);
      return result;
    } catch (error) {
      console.log("error is occured in deleteUserbyId", error);
      return false;
    }
  },
};

export default StackMethod;
