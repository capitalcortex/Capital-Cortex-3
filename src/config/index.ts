const local = {
  API_ENDPOINT: "http://localhost:4000",
};
const dev = {
  API_ENDPOINT: "https://dev-api.capitalcortex.ai",
};
const stag = {
  API_ENDPOINT: "https://stg-api.capitalcortex.ai",
};
const prod = {
  API_ENDPOINT: "https://api.capitalcortex.ai",
};
const config = {
  ...(process.env.NEXT_PUBLIC_STAGE === "local"
    ? local
    : process.env.NEXT_PUBLIC_STAGE === "dev"
    ? dev
    : process.env.NEXT_PUBLIC_STAGE === "stag"
    ? stag
    : prod),
};

export default config;
