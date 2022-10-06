import express from "express";
import AuthService from "../../services/authService";
import response from "../../config/response";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const userDTO = req.body;
    const { message } = await AuthService.SignUp(userDTO);
    console.log(message);
    res.send(message);
    g;
  } catch (e) {
    console.error(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDTO = req.body;
    if (req.session.userId === undefined) {
      // 세션이 만료되었거나 없다면
      const { code, message } = await AuthService.Login(userDTO);

      if (code == 1) {
        req.session.is_logined = true;
        req.session.userId = userDTO.id;
        res.send(message);
      } else {
        res.send(message);
      }
    } else {
      // 이미 세션 있는 경우
      res.send("이미 세션이 있어요");
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/logout", async function (req, res) {
  try {
    if (req.session.userId !== undefined) {
      // 세션이 존재한다면
      await req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.clearCookie("connect.sid");
          res.send("logout completed");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
