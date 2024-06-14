export const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  let authtoken = "mysecretkey";

  if (token !== authtoken) {
    res.json({
      status: 400,
      message: "invalid token",
    });
  }
  next();
};
