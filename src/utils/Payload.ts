import { CommonConfig } from '../config/CommonConfig';

/* ===== Payload helper start ===== */
export const PayloadHelper = async (request: any) => {
  const request_url = `${request?.protocol}://${request?.header('host')}${
    request?.originalUrl
  }`;
  const request_method = request?.method;
  const remote_ip = request?.ip;
  const request_on = request?.originalUrl.replace(
    `/${CommonConfig.API_URL}`,
    '',
  );
  const request_url_array = request_on.split('/');
  let action_from = 'api';
  if (request_url_array?.length > 1) {
    if (request_url_array[0] === 'admin') {
      action_from = 'admin';
    }
  }
  const get_request = <any>{};
  if (request?.headers !== undefined) {
    get_request.headers = {
      authorization: request?.headers?.authorization,
      platform: request?.headers?.platform ? request?.headers?.platform : '',
      action_from,
      request_url,
      request_method,
      request_on,
      remote_ip,
    };
  }
  if (request?.user !== undefined) {
    get_request.loginUser = request?.user;
  }
  if (request?.body !== undefined) {
    get_request.body = request?.body;
  }
  if (request?.file !== undefined) {
    get_request.file = request?.file;
  }
  if (request?.files !== undefined) {
    get_request.files = request?.files;
  }

   // Extract device type from User-Agent header
   let deviceType = 'unknown';
   const userAgent = request?.headers['user-agent'];
   if (userAgent) {
       if (userAgent.match(/Mobile/i)) {
           deviceType = 'mobile';
       } else if (userAgent.match(/iPad|Android|Touch/i)) {
           deviceType = 'tablet';
       } else if (userAgent.match(/Windows|Linux|Macintosh/i)) {
           deviceType = 'web';
       }
       else if (userAgent.match(/PostmanRuntime/i)) {
        deviceType = 'postman'; 
    }
   }

   if (request?.headers['timezone']) {
    get_request.timezone = request?.headers['timezone']
  }

   get_request.device_type = deviceType


  //  console.log("<<<<<<<<<<<<<<req timezone>>>>>>>>>>>>>>" ,get_request?.timezone)

  return get_request;
};
/* ===== Payload helper end ===== */
