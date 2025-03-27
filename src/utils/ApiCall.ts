import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../core/model/apiResponse/ApiResponse';
import { APP_JWT_TOCKEN_KEY, APP_USER_KEY, ROOT_URL } from './Constants';

interface UrlCallback {
  responseResult: any;
  UrlSyncPostCall: (
    url: string,
    parameters: any,
    successCallback: (result: any) => void,
    failureCallback: (error: any) => void,
    objRef?: any
  ) => void;
  UrlSyncExternalPostCall: (
    url: string,
    parameters: any,
    header: any,
    successCallback: (result: any) => void,
    failureCallback: (error: any) => void,
  ) => void;
  UrlSyncCall: (url: string, parameters: any) => void;
  UrlSyncGETCall: (
    url: string,
    successCallback: (result: any) => void,
    failureCallback: (error: any) => void,
    headers?: any,
  ) => void;
  UrlAsyncPostCallBack: (
    url: string,
    parameters: any,
    successCallback: (result: any) => void,
    failureCallback: (error: any) => void,
  ) => Promise<void>;
  UrlAsyncCall: (url: string, parameters: any, type: string) => Promise<APIResponse<any>>;
}

export const urlCallback: UrlCallback = {
  responseResult: null,
  UrlSyncPostCall: (url, parameters, successCallback, failureCallback, objRef) => {
    var finalURL: string = url;
    axios
      .post(finalURL, parameters, {
        headers: localStorage.getItem(APP_JWT_TOCKEN_KEY) ? {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Authorization": "Bearer " + localStorage.getItem(APP_JWT_TOCKEN_KEY)
        } : {},
        withCredentials: true
      })
      .then(function (response: AxiosResponse<any, any>) {
        var result = response.data;
        if (result.success) {
          successCallback(result);
        } else {
          successCallback(result);
        }
      })
      .catch(function (error) {
        console.log(error);
        console.warn('*** Network Error ***', finalURL, parameters);
        failureCallback(error);
      });
  },
  UrlSyncExternalPostCall: (
    url,
    _parameters,
    _header,
    successCallback,
    failureCallback,
  ) => {
    var finalURL: string = ROOT_URL + url;
    fetch(finalURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        console.warn('Error While Send Or Fetch ', error);
        failureCallback(error);
      });
  },
  UrlSyncCall: (url, parameters) => {
    var res: any = null;
    var finalURL: string = ROOT_URL + url;
    axios({
      method: 'post',
      url: finalURL,
      timeout: 6000, // 4 seconds timeout
      data: parameters,
    })
      .then((response: AxiosResponse) => {
        res = response.data;
      })
      .catch(_error => console.error('timeout exceeded'));
    return res;
  },
  UrlSyncGETCall: (url, successCallback, failureCallback, _headers) => {
    var finalURL: string = ROOT_URL + url;

    fetch(finalURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        successCallback(result);
      })
      .catch(error => {
        console.warn('Error While Send Or Fetch ', error);
        failureCallback(error);
      });
  },
  UrlAsyncPostCallBack: async (
    url,
    parameters,
    successCallback,
    failureCallback,
  ) => {
    try {
      var finalURL: string = ROOT_URL + url;
      let response = await fetch(finalURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: parameters ? JSON.stringify(parameters) : undefined,
      });
      if (response.ok) {
        let responseJson = await response.json();
        successCallback(responseJson);
      }
    } catch (error) {
      console.warn('Error While Send Or Fetch ', error);
      failureCallback(error);
    }
  },
  UrlAsyncCall: async (url, parameters, type) => {
    const headers = localStorage.getItem(APP_JWT_TOCKEN_KEY) ? {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem(APP_JWT_TOCKEN_KEY)
    } : {};

    try {
      let response;
      if (type === "GET") {
        response = await axios.get(url, {
          params: parameters,  // Correct way to send query params in GET
          headers: headers,
          withCredentials: true
        });
      } else {
        response = await axios.post(url, parameters, {
          headers: headers,
          withCredentials: true
        });
      }
      return response.data;
    } catch (error) {
      console.warn("Error While Sending or Fetching Data", error);
      return null;
    }
  }
};

export const apiCall = async (url: string, method: "GET" | "POST", body?: any) => {

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
  };

  const token = localStorage.getItem(APP_JWT_TOCKEN_KEY);
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      method,
      url,
      headers,
      withCredentials: true,
      ...(method === "POST" && { data: body }),
      ...(method === "GET" && body && { params: body }), // Attach query params for GET
    });

    return response.data;
  } catch (error: any) {
    if (error.status === 500) {
      localStorage.removeItem(APP_USER_KEY);
      localStorage.removeItem(APP_JWT_TOCKEN_KEY);
    }

    console.warn("API Error:", error.response?.data?.message || error.message);
    return null;
  }
};