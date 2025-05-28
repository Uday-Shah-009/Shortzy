import { cookieConfigs } from "../configs/cookie.config.js";
import { userLogin, userRegister } from "../Services/auth.service.js";
import tryCatch from "../utils/TryCatchWrapper.js"

export const register_user = tryCatch(async(req,res) => {
     const {name,email,password} = req.body;
     const { token, user } = await userRegister(name,email,password);
     
     // Set cookie with proper configuration
     res.cookie("token", token, {
       ...cookieConfigs,
       maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
     });
     
     res.status(200).json({
       success: true,
       message: "Registration Successful",
       token: token,
       user: user
     });
});

export const login_user = tryCatch(async(req,res) => {
  const { email, password } = req.body;
  const { token, user } = await userLogin(email, password);
  
  // Set cookie with proper configuration
  res.cookie("token", token, {
    ...cookieConfigs,
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  });
  
  res.status(200).json({
    success: true,
    message: "Login Successful",
    token: token,
    user: user
  });
});

export const logout_user = tryCatch(async(req,res) => {
  res.clearCookie("token", cookieConfigs);
  res.status(200).json({ success: true, message: "Logged Out!" });
});

export const getMe = tryCatch(async(req,res) => {
  res.status(200).json({ user: req.user });
});
