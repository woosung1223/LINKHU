import "dotenv/config";
import Database from "./mongo/mongoDB";

async function DatabaseTest() {
  //
  // CRUD - CREATE TEST
  //
  const userdata1 = {
    name: "Test1",
    userId: "TestId",
    email: "Test@test",
    password: "Testpassword",
    salt: "TestSalt",
  };
  //유저를 생성하며 성공시 생성된 유저의 id 실패시 false를 반환
  const result1 = await Database.CreateUser(userdata1);
  if (result1) {
    console.log("Create User success and return id is : ", result1);
  } else {
    console.log("Create User fail");
  }

  //
  //  CRUD - READ TEST
  //

  const user1 = await Database.getUserbyId(result1); // id값으로 해당 유저의 정보를 console에 출력하는 함수
  console.log("Create Test -- 새로운 user 만들기 : ", user1);
  //field 테스트를 위한 추가 user model

  const userdata2 = {
    name: "Test2",
    userId: "TestId2",
    email: "Test2@test",
    password: "Testpassword",
    salt: "TestSalt",
  };
  const result2 = await Database.CreateUser(userdata2);
  //현재 두명의 user가 있음

  //getUserbyField Test

  //존재하는데이터
  const FieldSearch1 = await Database.getUserbyField("name", "Test1");
  const FieldSearch2 = await Database.getUserbyField("name", "Test2");
  console.log("existing data: ", FieldSearch1, FieldSearch2);

  //없는 임의의 데이터
  const FieldSearch3 = await Database.getUserbyField("name", "Don't exist");
  console.log("nonexistent data: ", FieldSearch3);

  //
  // CRUD - Update TEST
  //
  const originData = await Database.getUserbyId(result1);
  console.log("기존 데이터 : ", originData);
  const updataData = await Database.updateUserById(result1, {
    name: "updated name",
  });
  console.log("updated data : ", updataData);

  //
  // CRUD - Delete
  //

  //Id 값으로 user 삭제하는 method 테스트
  const Deleteresult = await Database.deleteUserById(result1);
  if (Deleteresult) {
    console.log("Deleteing user success");
  } else {
    console.log("Deleting user is failed");
  }
}

setTimeout(DatabaseTest, 3000);
