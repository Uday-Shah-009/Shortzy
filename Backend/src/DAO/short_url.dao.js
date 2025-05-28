import ShortUrl from "../model/shortUrl.model.js";
export const saveShortUrl = async (shortUrl, longUrl, userid) => {
  console.log("from saveshort",userid)
  try {
    const newUrl = new ShortUrl({
      full_url: longUrl,
      short_url: shortUrl,
    });
    if (userid) {
      newUrl.user = userid;
    }
    await newUrl.save();
  } catch (err) {
    throw err
  }
};

export const getshortUrl = async (shortUrl) => {
  return await ShortUrl.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};

export const getCustomShortUrl = async (slug) => {
  return await ShortUrl.findOne({ short_url: slug });
};
