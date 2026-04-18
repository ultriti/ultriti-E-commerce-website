const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// user register funtion (ult)
module.exports.userRegister = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    profilePictureUrl,
    profilePictureID,
  } = req.body;

  if (!email || !password || !firstName) {
    return res
      .status(400)
      .json({ message: "fill all the credentails!", success: false });
  }

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ messgae: "email alredy registered!", success: false });
    }

    const userDetail = new userModel({
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
      },
      role: "user",
    });

    if (lastName) userDetail.fullName.lastName = lastName;
    if (profilePictureUrl) userDetail.profilePicture.Url = profilePictureUrl;
    if (profilePictureID) userDetail.profilePicture.ImageId = profilePictureID;

    await userDetail.save();

    const token = jwt.sign(
      { email: email, userId: userDetail._id },
      process.env.SECRET_KEY,
    );

    console.log("token e -> ", token);

    res.cookie("EcommerseToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 3600000 * 24 * 30),
    });

    return res
      .status(201)
      .json({ mesage: "user registered successfully!", success: true });
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      messgae: "internal server error",
      error: error.message,
      success: false,
    });
  }
};


// user login funtion (ult)
module.exports.userLogin = async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  if ((!email && !phoneNumber) || !password) {
    return res
      .status(404)
      .json({ message: "fill all the credentials!", success: false });
  }

  try {
    const userDetail = await userModel.findOne({ email });

    if (!userDetail) {
      return res
        .status(404)
        .json({ message: "user nor found!", success: false });
    }

    if (password !== userDetail.password) {
      return res
        .status(404)
        .json({ message: "wrong credentail match !", success: false });
    }

    const token = jwt.sign(
      { email: email, userId: userDetail._id },
      process.env.SECRET_KEY,
    );

    res.cookie("EcommerseToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 3600000 * 24 * 30),
    });

    return res
      .status(201)
      .json({ message: "user logged in successfully!", success: true });
  } catch (error) {
    console.log("error -> ", error);
    return res.status(500).json({
      message: "internal server error!",
      error: error.message,
      success: false,
    });
  }
};
