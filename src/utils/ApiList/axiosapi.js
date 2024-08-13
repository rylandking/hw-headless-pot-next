 

 const publicUrl =   "https://localhost:4000";
 /*
 const contactApi = corsAnywhere + baseurl + "/pif/api/account/v1/get-contact-details?appId=239";
 const detailsApi = corsAnywhere + baseurl + "/pif/api/session/details?appId=239";
 const toolsApi = corsAnywhere + baseurl + "/pif/api/tools/v1/get-tools?appId=239"; 
 const refreshApi = corsAnywhere + baseurl + "/pif/api/session/refresh?appId=239";
 const userApi = corsAnywhere + baseurl + "/pif/api/user/v1/get-user?appId=239";
 const statusApi = corsAnywhere + baseurl + "/pif/api/status/v1/get-status?appId=239";
 */
 const contactApi = "http://localhost:4000/pif/api/account/v1/get-contact-details?appId=239";
 const detailsApi = "http://localhost:4000/pif/api/session/details?appId=239";
 const toolsApi = "http://localhost:4000/pif/api/tools/v1/get-tools?appId=239";
 const refreshApi = "http://localhost:4000/pif/api/session/refresh?appId=239";
 const userApi = "http://localhost:4000/pif/api/user/v1/get-user?appId=239";
 const statusApi = "http://localhost:4000/pif/api/status/v1/get-status?appId=239";
 
 const tokenUrl =
   "https://api.ciq3kgmonc-honeywell1-d3-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token  ";
 
 
 
   const getProductDetail ="http://localhost:4000/productDetails/productDescription";
   
   const getPriceDetail ="http://localhost:4000/productDetails/price";
   const getAvailability ="http://localhost:4000/productDetails/atp";
   
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
   };
 