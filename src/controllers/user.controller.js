const userService = require("../services/user.service");
const logger = require("../utils/logger");
const { responseWrapper } = require("../utils/general-utils");
const registerUser = async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const { userName, password } = req.body;
    await userService.registerUser(userName, password, authToken);
    res
      .status(201)
      .send(responseWrapper(201, "User registered successfully", null));
  } catch (error) {
    logger.error("Error registering user:", error);
    res.status(500).send(responseWrapper(400, null, error.message));
  }
};

const validateLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userService.validateLogin(userName, password);
    res.status(200).send(responseWrapper(200, user, null));
  } catch (error) {
    logger.error("Error validating user:", error);
    res.status(400).send(responseWrapper(400, null, error.message));
  }
};

module.exports = { registerUser, validateLogin };
