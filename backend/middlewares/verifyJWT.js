const jwt = require('jsonwebtoken');
require('dotenv').config();
const { promisify } = require('util');
const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');

const verifyJWT = catchAsync(async (req, res, next) => {
  let token;

  // AccessToken'ın geçerliliğini kontrol et
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log("111111111111111111")
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.access_token) {
    console.log("222222222222222222")
    token = req.cookies.access_token;
  } else {
    console.log("333333333333333333")
    token = req.cookies.access_token;
  }

  // console.log(req)
  console.log("verifyjwt-------------- token")
  console.log(req.cookies)
  console.log("verifyjwt-------------- token")

  const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET);
  const currentUser = await User.findById(decoded.userId);
  if (currentUser) {
    console.log(currentUser)
    req.user = currentUser;
    return next();
  }

  const refreshToken = req.cookies.refresh_token;
  console.log("-------------- refreshtoken")
  console.log(refreshToken)
  console.log("-------------- refreshtoken")
  if (!refreshToken) return res.sendStatus(403); // RefreshToken yoksa, oturumu sonlandır

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
    if (refreshErr) return res.sendStatus(403); // RefreshToken geçerli değilse, oturumu sonlandır
    console.log("zzzzzzzzzzzzzzz");

    // Yeni bir AccessToken üret
    const newAccessToken = jwt.sign({ username: refreshDecoded.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    // Yeni AccessToken'ı kullanıcıya gönder
    res.cookie('access_token', newAccessToken, { httpOnly: true });      
    req.user = refreshDecoded.username;
    next();
  });
});


module.exports = verifyJWT;
