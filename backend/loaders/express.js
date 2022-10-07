import path from "path";
import morgan from "morgan";
import session from "express-session";
import seesionAdapter from "./session";
import express from "express";
const { default: env } = require("../config/index");

export default async ({ app }) => {
  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      httpOnly: true,
      secret: env.sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: seesionAdapter("mongo"),
      cookie: {
        httpOnly: true,
        cookie: { 
          maxAge: 1000 * 60 * 60, // 1시간
        }, // 1시간 뒤 만료
      },
    })
  );

  // routers
  const { default: tgwingRouter } = require("../api/routes/group"); // 동아리
  const { default: authRouter } = require("../api/routes/auth"); // 인증
  const { default: editRouter } = require("../api/routes/edit"); // 회원정보 수정
  app.use("/group", tgwingRouter);
  app.use("/auth", authRouter);
  app.use("/edit", editRouter);
  
  // 404 handler
  app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });

  // error handler
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = env.nodeEnv !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
  });
};
