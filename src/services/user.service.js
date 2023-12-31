const { User } = require("../models");
const logger = require("../utils/logger");
const {
  encryptPassword,
  comparePasswords,
  generateBearerToken,
  decryptToken,
} = require("../utils/general-utils");

const registerUser = async (user_name, password, authToken) => {
  logger.info("UserService:function register user");
  const performedBy = await decryptToken(authToken);
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
    created_by: performedBy.userId,
    updated_by: performedBy.userId,
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
