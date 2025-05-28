import userModel from "../model/user.model.js";
import ShortUrl from "../model/shortUrl.model.js";

export const findUser = async (email) => {
  return await userModel.findOne({ email });
};

export const findById = async (id) => {
  return await userModel.findById(id); // Changed from findOne({id}) to findById(id)
};
export const createUser = async(name,email,password) => {
    const newUser = new userModel({
        name,
        email,
        password,
    });
    await newUser.save();
    return newUser;
}

export const getUrlsByUser = async(id) => {
  try {
    const urls = await ShortUrl.find({ user: id }).sort({ createdAt: -1 });
    return urls;
  } catch (error) {
    throw error;
  }
} 
