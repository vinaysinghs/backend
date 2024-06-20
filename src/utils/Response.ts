/* ==== Response get start ===== */
export const GetResponseHelper = async (response: any) => {
    const get_response = <any>{};
    get_response.status = response?.status;
    get_response.status_code = response?.status_code;
    get_response.message = response?.message;
    if (response?.data !== undefined) {
      get_response.data = response?.data;
    }
    if (response?.error !== undefined) {
      get_response.error = response?.error;
    }
    if (response?.errors !== undefined) {
      get_response.errors = response?.errors;
    }
    if (response?.access_token !== undefined) {
      get_response.access_token = response?.access_token;
    }
    if (response?.admin_timezone !== undefined) {
      get_response.admin_timezone = response?.admin_timezone;
    }
    if (response?.custom_params !== undefined) {
      get_response.custom_params = response?.custom_params;
    }
  
    return get_response;
  };
  /* ==== Response get end ===== */
  
  /* ==== Response start ===== */
  export const ResponseHelper = async (response: any) => {
    const get_response = await GetResponseHelper(response);
  
    if (response?.response) {
      return response?.response?.status(response?.status_code).json(get_response);
    } else {
      return get_response;
    }
  };
  
  /* ==== Response end ===== */
  