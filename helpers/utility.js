const jwt = require('jsonwebtoken');

const getThemehub = () => {
  const theme_hub = [1, 2, 3, 4, 5];
  return theme_hub[Math.floor(Math.random() * theme_hub.length)];
}


const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.user_name },
    process.env.SECRET_KEY,
    { expiresIn: "365d" }
  );
};

const getUserId = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return decodedToken.userId;
}

const verifyAccessToken = async (token) => {
  try {
    const secret = process.env.SECRET_KEY;

    const decoded = jwt.verify(token, secret);
    // console.log(decoded)
    if (!decoded) {
      throw Error("Proses Autentikasi Gagal");
    }
    return { success: true, token: decoded };
  } catch (error) {
    return {
      success: false,
      message: "Server Error",
      error_code: 500,
    };
  }
};

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



module.exports = { 
  generateAccessToken, 
  getUserId, 
  verifyAccessToken, 
  generateRandomString,
  getThemehub
};