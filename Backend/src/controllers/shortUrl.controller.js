import { getshortUrl, saveShortUrl } from "../DAO/short_url.dao.js";
import { createShortUrl, createShortUrlWithUser } from "../Services/shortUrl.service.js";
import tryCatch from "../utils/TryCatchWrapper.js";

export const createUrl = tryCatch(async (req, res) => {
  const { url } = req.body;
  let shortUrl;
  if (req.user && req.user._id) {
    shortUrl = await createShortUrlWithUser(url, req.user._id);
  } else {
    shortUrl = await createShortUrl(url);
  }
  
  res.status(200).json({
    success: true,
    message: "Short URL created successfully",
    data: `${process.env.APP_URL}${shortUrl}`,
  });
});

export const createShortUrlAuth = tryCatch(async (req, res) => {
  const data = req.body;
  const userId = req.user.user ? req.user.user._id : req.user._id;
  
  const shortUrl = await createShortUrlWithUser(data.url, userId, data.slug);
  
  res.status(200).json({
    success: true,
    message: "Short URL created successfully",
    data: `${process.env.APP_URL}${shortUrl}`,
  });
});

export const redirectUrl = tryCatch(async (req, res) => {
  const { id } = req.params;
  const url = await getshortUrl(id);
  res.redirect(url.full_url);
 });
