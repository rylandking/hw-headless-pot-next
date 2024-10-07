//const baseUrl = 'http://localhost:3000/api/proxy';
const baseUrl = "";
//const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''; // Default to an empty string if not set
const contactApi = `${baseUrl}/pif/api/account/v1/get-contact-details?appId=239`;
const detailsApi = `${baseUrl}/pif/api/session/details?appId=239`;
const toolsApi = `${baseUrl}/pif/api/tools/v1/get-tools?appId=239`;
const refreshApi = `${baseUrl}/pif/api/session/refresh?appId=239`;
const userApi = `${baseUrl}/pif/api/user/v1/get-user?appId=239`;
const statusApi = `${baseUrl}/pif/api/status/v1/get-status?appId=239`;

const tokenUrl = "https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token";

const getProductDetail = `${baseUrl}/productDetails/productDescription`;
const getPriceDetail = `${baseUrl}/productDetails/price`;
const getAvailability = `${baseUrl}/productDetails/atp`;

const getBynderPdf = `${baseUrl}/download/?type=original`;

export {
  contactApi,
  detailsApi,
  toolsApi,
  refreshApi,
  userApi,
  statusApi,
  tokenUrl,
  getProductDetail,
  getPriceDetail,
  getAvailability,
  getBynderPdf
};
