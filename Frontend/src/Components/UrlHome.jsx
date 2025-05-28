import React, { useState } from "react";
import { toast } from "react-toastify";
import { createShortUrl, createCustomShortUrl } from "../API/shorturl.api";
import { useSelector } from "react-redux";

const UrlHome = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Get authentication state from Redux store
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth?.isAuthenticated;

  const handleSubmit = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    
    setIsLoading(true);
    try {
      let shortUrl;
      
      // If user is authenticated and has provided a custom slug
      if (isAuthenticated && slug) {
        shortUrl = await createCustomShortUrl(url, slug);
      } else {
        // Otherwise use the regular URL shortening
        shortUrl = await createShortUrl(url);
      }
      
      setShorturl(shortUrl);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shorturl);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <div className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="url"
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url-that-needs-shortening"
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 
              bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>

        {/* Custom slug field - only shown to authenticated users */}
        {isAuthenticated && (
          <div className="mb-4">
            <label
              htmlFor="slug"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Custom URL Slug (Optional)
            </label>
            <div className="flex items-center">
              <span className="bg-gray-800 text-gray-400 p-3 border border-r-0 rounded-l-md border-gray-600">
                shortzy.com/
              </span>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="your-custom-slug"
                className="flex-1 p-3 border rounded-r-md outline-none focus:ring-2 focus:ring-blue-500 
                  bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Leave empty for a randomly generated URL
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          type="button"
          disabled={isLoading}
          className={`w-full ${isLoading ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-4 rounded-md transition-colors`}
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </div>

      {shorturl && (
        <div className="mt-6 p-4 rounded-md bg-gray-700">
          <p className="text-sm mb-2 text-gray-300">Your shortened URL:</p>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={shorturl}
              className="flex-grow p-3 border rounded-l-md bg-gray-800 border-gray-600 text-white"
            />
            <button 
              onClick={handleCopy} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlHome;
