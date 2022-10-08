import aws from "aws-sdk";
import env from "../../config/index";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: env.awsId,
    secretAccessKey: env.awsSecret,
    region: "ap-northeast-2",
  },
});

const AccessS3 = {
  //해당 데이터의 저장된 명을 통해 삭제하는 메소드
  DeleteS3file: async function (filename) {
    const objectParams_del = {
      Bucket: "linkhu",
      Key: filename,
    };
    await s3
      .deleteObject(objectParams_del)
      .promise()
      .then((data) => {
        console.log("succes data is :", data);
      })
      .catch((error) => {
        console.log("faile data is :", error);
      });
  },
};

export default AccessS3;
