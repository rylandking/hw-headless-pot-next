//const baseUrl = 'http://localhost:3000/api/proxy';
const baseUrl = "";
//const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''; // Default to an empty string if not set
const contactApi = `${baseUrl}/api/proxy/pif/api/account/v1/get-contact-details?appId=239`;
const detailsApi = `${baseUrl}/api/proxy/pif/api/session/details?appId=239`;
const toolsApi = `${baseUrl}/api/proxy/pif/api/tools/v1/get-tools?appId=239`;
const refreshApi = `${baseUrl}/api/proxy/pif/api/session/refresh?appId=239`;
const userApi = `${baseUrl}/api/proxy/pif/api/user/v1/get-user?appId=239`;
const statusApi = `${baseUrl}/api/proxy/pif/api/status/v1/get-status?appId=239`;

const tokenUrl = "https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token";

const getProductDetail = `${baseUrl}/api/proxy/productDetails/productDescription`;
const getPriceDetail = `${baseUrl}/api/proxy/productDetails/price`;
const getAvailability = `${baseUrl}/api/proxy/productDetails/atp`;

const getBynderPdf = `${baseUrl}/api/proxy/download/?type=original`;

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
