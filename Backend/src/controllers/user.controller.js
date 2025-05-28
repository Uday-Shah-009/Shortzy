import { getUrlsByUser } from "../DAO/user.dao.js";
import tryCatch from "../utils/TryCatchWrapper.js";

export const getUserUrls = tryCatch(async (req, res) => { 
  const {_id} = req.user;
  const urls = await getUrlsByUser(_id);
  res.status(200).json({ urls });
});
