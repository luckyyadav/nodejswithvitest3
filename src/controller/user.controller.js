import prisma from "../config/db.js";

export const createUser = async (req, res, next) => {
  const { name, age, phone, isActive } = req.body;
  try {
    if (!name || !age || !phone) {
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!age) missingFields.push("age");
      if (!phone) missingFields.push("phone");

      return res.json({
        status: 400,
        message:
          "something went wrong. Fields missing " + missingFields.join(", "),
      });
    }
    const user = await prisma.user.create({
      data: {
        name,
        age,
        phone,
        isActive,
      },
    });
    return res.json({
      status: 201,
      message: "user is created",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.json({
      status: 200,
      message: "users are fetched",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    return res.json({
      status: 200,
      message: user ? "user is fetched" : "user not found",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, age, phone, isActive } = req.body;
  const userId = req.params.id;
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        age,
        phone,
        isActive,
      },
    });
    return res.json({
      status: 200,
      message: "user is updated",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    return res.json({
      status: 200,
      message: "user is deleted",
    });
  } catch (err) {
    next(err);
  }
};
