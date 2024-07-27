 

 const  baseurl = "https://buildingsbt.stage.honeywell.com";
 const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
/*
const contactApi = corsAnywhere + baseurl + "/pif/api/account/v1/get-contact-details?appId=239";
const detailsApi = corsAnywhere + baseurl + "/pif/api/session/details?appId=239";
const toolsApi = corsAnywhere + baseurl + "/pif/api/tools/v1/get-tools?appId=239"; 
const refreshApi = corsAnywhere + baseurl + "/pif/api/session/refresh?appId=239";
const userApi = corsAnywhere + baseurl + "/pif/api/user/v1/get-user?appId=239";
const statusApi = corsAnywhere + baseurl + "/pif/api/status/v1/get-status?appId=239";
*/
const contactApi = "http://localhost:3000/pif/api/account/v1/get-contact-details?appId=239"
const detailsApi = "http://localhost:3000/pif/api/session/details?appId=239";
const toolsApi = "http://localhost:3000/pif/api/tools/v1/get-tools?appId=239";
const refreshApi = "http://localhost:3000/pif/api/session/refresh?appId=239";
const userApi = "http://localhost:3000/pif/api/user/v1/get-user?appId=239";
const statusApi = "http://localhost:3000/pif/api/status/v1/get-status?appId=239";


export { contactApi, detailsApi, toolsApi, refreshApi, userApi, statusApi };


