import connect from "./mongo/connectingDB";
import User from "./mongo/userCRUD";
import Stack from "./mongo/stackCRUD";

async function test() {
  await connect();
  const user1 = {
    name: "user1",
    userId: "user1Id",
    email: "user@user",
    password: "user1",
  };

  const user2 = {
    name: "user2",
    userId: "user2Id",
    email: "user2@user",
    password: "user2",
  };
  const user1Id = await User.CreateUser(user1);
  const user2Id = await User.CreateUser(user2);

  console.log("User 1 is Create and id is :", user1Id);
  console.log("User 2 is Create and id is :", user2Id);
  const ReactStack = await Stack.CreateStack("React");

  console.log("React Stack is enrolled and it's id is : ", ReactStack);

  const User1Register = await Stack.StackRegister(ReactStack, user1Id);
  console.log("Resister User1  result : ", User1Register);
  const User2Register = await Stack.StackRegister(ReactStack, user2Id);
  console.log("Resister User2  result : ", User2Register);

  const InnerMembers = await Stack.StackMembmers(ReactStack);
  console.log("Informaiton in the React Stack : ", InnerMembers);

  const MentiToMentor = await Stack.MentorRegister(ReactStack, user1Id);
  console.log("User 1 is changed / menti -> mento : ", MentiToMentor);

  const user3 = {
    name: "user3",
    userId: "user3Id",
    email: "user3@user",
    password: "user3",
  };
  const user3Id = await User.CreateUser(user3);

  const DirectMentor = await Stack.MentorRegister(ReactStack, user3Id);
  console.log("User 3 is directly register mentor : ", DirectMentor);

  const ResultMembers = await Stack.StackMembmers(ReactStack);
  console.log("Result User information is : ", ResultMembers);

  const DeleteUser1 = await Stack.DeleteMember(ReactStack, user1Id);
  console.log("User 1 is deleted by React : ", DeleteUser1);
  const DeleteUser2 = await Stack.DeleteMember(ReactStack, user2Id);
  console.log("User 2 is deleted by React : ", DeleteUser2);
  const DeleteUser3 = await Stack.DeleteMember(ReactStack, user3Id);
  console.log("User 3 is deleted by React : ", DeleteUser3);

  const DelteStack = await Stack.DeleteStack(ReactStack);
  console.log("React Stack is deleted : ", DelteStack);

  console.log("delete User");
  await User.deleteUserById(user1Id);
  await User.deleteUserById(user2Id);
  await User.deleteUserById(user3Id);
}

test();
