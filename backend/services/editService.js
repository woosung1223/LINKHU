import response from "../config/response";
import Database from "../database/mongo/userCRUD";
import s3 from "./S3Serivce";
const editService = {
  saveInfo: async function (userAttribute) {
    // user attribute가 들어오면 이를 토대로 DB 에 접근해서
    // 유저 정보 재작성
    try {
      const result = await Database.updateUserById(userAttribute.id, {
        name: userAttribute.userName,
        userId: userAttribute.id,
        email: userAttribute.email,
        password: userAttribute.password,
      });
      if (result !== null) {
        // 성공
        return response.SUCCESS;
      } else {
        // 실패
        return response.INTERNAL_ERR;
      }
    } catch (e) {
      console.error(e);
      return response.INTERNAL_ERR;
    }
  },

  saveImage: async function (userAttribute) {
    try {
      const userId = userAttribute.id;
      const new_location = userAttribute.baseUrl;
      // s3 update 로직
      // 기존 이미지 데이터 삭제
      const user = await Database.getUserbyId(userId);
      const old_location = user.imageLoc;
      const updateResult = await Database.updateUserById(userId, {
        imageLoc: new_location,
      });
      if (old_location !== undefined) {
        // 이미지를 처음 등록할 때가 아니라면
        const deleteResult = await s3.DeleteS3file(old_location);
        if (deleteResult === false) {
          return response.INTERNAL_ERR;
        }
      }

      if (updateResult !== null) {
        // 성공
        return response.SUCCESS;
      } else {
        // 실패
        return response.INTERNAL_ERR;
      }
    } catch (e) {
      console.error(e);
      return response.INTERNAL_ERR;
    }
  },
};

export default editService;
