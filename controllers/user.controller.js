const models = require('../models');
const bcryptjs = require("bcryptjs");


const {
  generateRandomString,
  generateAccessToken,
  getThemehub
} = require("../helpers/utility");
const { createMail, transporter, createVerificationToken } = require("../helpers/email-verification")

// Function expressions
exports.register = async (req, res) => {
  try {
    console.log(req.body)
    const existingUser = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "Email sudah terdaftar!",
        success: false,
        error_code: 409,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.password, salt);

    const username = req.body.full_name
      .toString()
      .replace(/\s+/g, "")
      .toLowerCase();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const newUserData = {
      full_name: req.body.full_name,
      username: `${username}${randomNumber}`,
      email: req.body.email,
      password: hash,
      profession: req.body.profession,
      phone: req.body.phone,
      web: req.body.web,
      address: req.body.address,
      photo: req.body.photo,
      about: req.body.about,
      qr_code: generateRandomString(12),
      role_id: null,
      is_verify: false,
      is_premium: false,
      theme_hub: getThemehub(),
      is_complete_profile: false,
    };

    const user = await models.User.create(newUserData);

    // Send Email Verification
    const token = await createVerificationToken(user.id)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await models.EmailVerification.create({
      token,
      user_id: user.id,
      expiresAt,
      email: user.email
    });

    const mail = createMail(req.body.email, token)

    await transporter.sendMail(mail)

    const { password, id, ...customizedUser } = user.dataValues;
    return res.status(201).json({
      data: customizedUser,
      message: "Pengguna berhasil dibuat, email verifikasi sudah terkirim",
      success: true,
      error_code: 0,
    });
  } catch (error) {
    console.log("Error di signup proses: ", error);
    return res.status(500).json({
      message: "Kesalahan internal server",
      success: false,
      error_code: 500,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(401).json({
        message: "Kredensial tidak valid!",
        success: false,
        error_code: 401,
      });
    }

    const isPasswordValid = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Kredensial tidak valid!",
        success: false,
        error_code: 401,
      });
    }

    const token = generateAccessToken(user);

    const { password, id, ...userWithoutPassword } = user.dataValues;
    userWithoutPassword.token = token;

    return res.status(200).json({
      message: "Autentikasi berhasil!",
      data: userWithoutPassword,
      success: true,
      error_code: 0,
    });
  } catch (error) {
    console.log("Error pada proses login: ", error);
    return res.status(500).json({
      message: "Kesalahan internal server",
      success: false,
      error_code: 500,
    });
  }
};