
import { generateNanoid } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../DAO/short_url.dao.js";

export const createShortUrl = async(url) => {
    const shortUrl = generateNanoid(6);
    if(!shortUrl) throw new Error("short Url is not Generated")
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}

export const createShortUrlWithUser = async(url, userId , slug=null) => {
    console.log("user from creating" , userId);
    const shortUrl = slug || generateNanoid(6);
    const exists = await getCustomShortUrl(slug);
    if(exists) throw new Error("This custom url already exists");
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
}

