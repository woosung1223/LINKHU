import connect from "./mongo/connectingDB";
import User from "./mongo/userCRUD";
import Stack from "./mongo/stackCRUD";

async function test() {
  //DB연결
  await connect();

  //User 1,2 등록
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

  //React Stack 생성
  const ReactStack = await Stack.CreateStack("React");

  console.log("React Stack is enrolled and it's id is : ", ReactStack);

  //user1, user2 React Stack에 등록
  const User1Register = await Stack.StackRegister(ReactStack, user1Id);
  console.log("Resister User1  result : ", User1Register);
  const User2Register = await Stack.StackRegister(ReactStack, user2Id);
  console.log("Resister User2  result : ", User2Register);

  //React Stack안의 정보 중간 출력
  const InnerMembers = await Stack.StackMembmers(ReactStack);
  console.log("Informaiton in the React Stack : ", InnerMembers);

  //User1을 menti에서 mento로 변경
  const MentiToMentor = await Stack.MentorRegister(ReactStack, user1Id);
  console.log("User 1 is changed / menti -> mento : ", MentiToMentor);

  //USER3을 direct로 mento로 등록
  const user3 = {
    name: "user3",
    userId: "user3Id",
    email: "user3@user",
    password: "user3",
  };
  const user3Id = await User.CreateUser(user3);

  const DirectMentor = await Stack.MentorRegister(ReactStack, user3Id);
  console.log("User 3 is directly register mentor : ", DirectMentor);

  //최종 React Stack안의 데이터 출력
  const ResultMembers = await Stack.StackMembmers(ReactStack);
  console.log("Result User information is : ", ResultMembers);

  //React Stack안의 user들 하나씩 제거
  const DeleteUser1 = await Stack.DeleteMember(ReactStack, user1Id);
  console.log("User 1 is deleted by React : ", DeleteUser1);
  const DeleteUser2 = await Stack.DeleteMember(ReactStack, user2Id);
  console.log("User 2 is deleted by React : ", DeleteUser2);
  const DeleteUser3 = await Stack.DeleteMember(ReactStack, user3Id);
  console.log("User 3 is deleted by React : ", DeleteUser3);

  //최종적으로 React 스택도 제거
  const DelteStack = await Stack.DeleteStack(ReactStack);
  console.log("React Stack is deleted : ", DelteStack);

  //만들어진 user 제거
  console.log("delete User");
  await User.deleteUserById(user1Id);
  await User.deleteUserById(user2Id);
  await User.deleteUserById(user3Id);
}

test();
