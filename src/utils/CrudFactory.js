/** @format */

import { CrudRequest } from "@crud/core";
import { API_URL } from "../constants";
import { enqueueSnackbar } from "notistack";
import { loader } from "react-global-loader";

export class CrudFactory extends CrudRequest {
  dateFormat = "MMMM Do YYYY hh:mm A";
  baseUrl = API_URL;

  getUrl = (...segments) =>
    segments.reduce((url, segment) => url + segment, this.baseUrl);

  async retrieve(url, data = {}, requestOptions = {}) {
    return this.send({
      method: "GET",
      url: `retrieve/${url}`,
      data,
      ...requestOptions,
    });
  }

  async get(url, data = {}, requestOptions = {}) {
    return this.send({
      method: "GET",
      url: `${url}`,
      data,
      ...requestOptions,
    });
  }

  async post(url, data = {}, requestOptions = {}) {
    return this.send({
      method: "POST",
      url: `create/${url}`,
      data,
      ...requestOptions,
    });
  }
  async put(url, data = {}, requestOptions = {}) {
    return this.send({
      method: "PUT",
      url: `update/${url}`,
      data,
      ...requestOptions,
    });
  }

  async delete(url, data = {}, requestOptions = {}) {
    return this.send({
      method: "DELETE",
      url: `delete/${url}`,
      data,
      ...requestOptions,
    });
  }

  async notify({ message, type }) {
    enqueueSnackbar(message, { variant: type });
    // enqueueSnackbar(message, { variant: type, persist: true })
  }

  // async send(requestOptions = {}) {
  //   const { url, data, method, notify = true } = requestOptions;

  //   const options = {
  //     ...requestOptions.ajaxOptions,
  //     method,
  //   };

  //   let fullUrl;

  //   options.headers = {
  //     ...options.headers,
  //     Accept: "application/json",
  //     Authorization: localStorage.getItem("token"),
  //     'ngrok-skip-browser-warning': true
  //   };

  //   if (!(data instanceof FormData)) {
  //     options.headers["Content-Type"] = "application/json";
  //   }

  //   fullUrl = this.getUrl(url);

  //   if (options.method === "GET") {
  //     const queryString = new URLSearchParams(data);
  //     fullUrl += `?${queryString}`;
  //   } else if (data instanceof FormData) {
  //     options.body = data;
  //   } else {
  //     options.body = JSON.stringify(data);
  //   }

  //   let res = {
  //     data: [],
  //     message: "",
  //     type: "error",
  //     errors: [],
  //   };

  //   try {
  //     loader.show()
  //     this.call("loading", [true]);
  //     const response = await fetch(fullUrl, options);
  //     if (response.status === 200) {
  //       res = await response.json();
  //       const { type, message } = res;
  //       if (options.method !== "GET" && notify) {
  //         this.notify({
  //           message,
  //           type,
  //         });
  //       }
  //     } else {
  //       // no inspection ExceptionCaughtLocallyJS
  //       throw new Error(`${response.status} : ${response.statusText}`);
  //     }
  //   } catch (e) {
  //     loader.hide()
  //     this.call("loading", [false]);
  //     console.error(e);
  //     this.notify({
  //       message: e.message,
  //       type: "error",
  //     });
  //     throw e;
  //   } finally {
  //     loader.hide()
  //     this.call("loading", [false]);
  //   }

  //   const { type } = res;

  //   if (type === "error") throw res;

  //   return res;
  // }
  async send(requestOptions = {}) {
    const { url, data, method, notify = true } = requestOptions;

    const options = {
      ...requestOptions.ajaxOptions,
      method,
    };

    let fullUrl;

    options.headers = {
      ...options.headers,
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
      "ngrok-skip-browser-warning": true,
    };

    if (!(data instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }

    fullUrl = this.getUrl(url);

    if (options.method === "GET") {
      const queryString = new URLSearchParams(data);
      fullUrl += `?${queryString}`;
    } else if (data instanceof FormData) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }

    let res = {
      data: [],
      message: "",
      type: "error",
      errors: [],
    };

    try {
      loader.show();
      this.call("loading", [true]);
      const response = await fetch(fullUrl, options);

      // Check if the response status is OK (200–299)
      if (response.ok) {
        res = await response.json();
        const { type, message } = res;
        if (options.method !== "GET" && notify) {
          this.notify({
            message,
            type,
          });
        }
      } else {
        // Handle the error response
        const errorResponse = await response.json(); // Parse the error response
        const errorMessage = errorResponse.message || "An error occurred.";

        // Notify with the server-provided error message
        if (notify) {
          this.notify({
            message: errorMessage,
            type: "error",
          });
        }

        // Create an error object to throw, including the response
        const error = new Error(errorMessage);
        error.response = errorResponse; // Attach the full error response to the error object
        throw error;
      }
    } catch (e) {
      // Log the error and re-throw it without notifying again (already notified above)
      console.error(e);
      throw e; // Rethrow the error to be handled by the calling function
    } finally {
      loader.hide();
      this.call("loading", [false]);
    }

    const { type } = res;

    if (type === "error") throw res;

    return res;
  }
}

export const $crud = new CrudFactory();
