const { User } = require("../models");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger"); // Adjust the path to your logger.js file
const {
  encryptPassword,
  comparePasswords,
  generateBearerToken,
  decryptToken,
} = require("../utils/general-utils");

const registerUser = async (user_name, password) => {
  logger.info("UserService:function register user");
  const user = await User.findOne({
    where: {
      user_name: user_name,
    },
  });

  if (user) {
    throw new Error("Username already exists");
  }
  const userPassword = await encryptPassword(password);
  await User.create({
    user_name,
    password_salt: userPassword,
    created_by: 1234,
    updated_by: 1234,
  });

  logger.info("User registered successfully:");
};

const validateLogin = async (userName, password) => {
  logger.info("UserService:function validate user login");
  const user = await User.findOne({
    where: {
      user_name: userName,
    },
  });

  if (!user) {
    throw new Error("Incorrect username! Please try again");
  }

  const dbPassword = user.password_salt;
  const matchPasswords = await comparePasswords(password, dbPassword);

  if (matchPasswords) {
    const token = generateBearerToken(user);
    return token;
  } else {
    throw new Error("Incorrect password! Please try again");
  }
};

module.exports = { registerUser, validateLogin };
