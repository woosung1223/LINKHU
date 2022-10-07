import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import env from "../../../config/index";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: env.awsId,
    secretAccessKey: env.awsSecret,
    region: "ap-northeast-2",
  },
});

const uploader = multer({
  //   dest: "uploads/videos/",
  //용량 제한 2MB
  limits: {
    fileSize: 2000000,
  },
  storage: multerS3({
    s3: s3,
    bucket: "linkhu",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

export default uploader;
