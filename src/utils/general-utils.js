const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function encryptPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePasswords(payloadPassword, dbPassword) {
  try {
    const passwordsMatch = await bcrypt.compare(payloadPassword, dbPassword);
    return passwordsMatch;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function generateBearerToken(user) {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(
    {
      userId: user.id,
      userName: user.user_name
    },
    secretKey,
    { expiresIn: "72h" }
  );

  return `Bearer ${token}`;
}

async function decryptToken(bearerToken) {
    try {
      const token = bearerToken.split(' ')[1];
      const secretKey = process.env.SECRET_KEY;
  
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      console.error(error);
  
      throw new Error('Authentication Failed');
    }
  }

function responseWrapper(status, data, error){
    if(!error){
        return {
            status,
            data,
            error: null
        }
    }
    else{
        return {
            status: 400,
            data: null,
            error
        }
    }
}

module.exports = {
  encryptPassword,
  comparePasswords,
  generateBearerToken,
  decryptToken,
  responseWrapper
};
