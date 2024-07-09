/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "capitalcortextstr.blob.core.windows.net",
      "capitalcortstorage.blob.core.windows.net",
      "lh3.googleusercontent.com",
      "www.bing.com",
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "capitalcortextstr.blob.core.windows.net",
    //     port: "",
    //     pathname: "/**/**/*",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "capitalcortstorage.blob.core.windows.net",
    //     port: "",
    //     pathname: "/**/**/*",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //     port: "",
    //     pathname: "/**/**/*",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "www.bing.com",
    //     port: "",
    //     pathname: "/**/**/*",
    //   },
    // ],
  },
};
module.exports = nextConfig;
