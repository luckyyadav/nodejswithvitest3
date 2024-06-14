export const errorMiddleware = (err, req, res, next) => {
  res.json({
    status: 400,
    message: "something went wrong. " + err,
  });

  next();
};
