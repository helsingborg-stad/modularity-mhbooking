import axios from "axios";

/**
 * Build query URL
 * @param {obj} queryParams
 */
 const encodeQueryData = (queryParams) => {
  const data = [];
  const entries = Object.entries(queryParams);
  entries.forEach(([key, value]) => {
    data.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  return data.join("&");
};

/**
 * Builds a service request url
 * @param {string} endpoint
 * @param {obj} params
 */
export const buildServiceUrl = async (endpoint = "", params = {}) => {
  const baseUrl = document.getElementById('mh-mount-booking').attributes['data-endpoint'].nodeValue;
  // Build query url
  const queryString = encodeQueryData(params);
  // Trim slashes
  const sanitizedEndpoint = endpoint.replace(/^\/|\/$/g, "");
  // Build url
  const completeUrl = `${baseUrl}/${sanitizedEndpoint}?${queryString}`;

  return completeUrl;
};

/**
 * Axios request
 * User ID will overwrite bearer token in header.
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {obj} data
 * @param {obj} headers
 */
const request = async (endpoint, method, data, headers, params) => {
  const url = await buildServiceUrl(endpoint);

  // Merge custom headers
  const newHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    // Do request
    const req = await axios({
      url,
      method,
      headers: newHeaders,
      data,
      params,
    });
    return req;
  } catch (error) {
    return { message: error.message, ...error.response };
  }
};

const get = (endpoint = "", headers, params) =>
  request(endpoint, "get", undefined, headers, params);

const post = (endpoint = "", body, headers) =>
  request(endpoint, "post", body, headers);

const remove = (endpoint = "", body, headers) =>
  request(endpoint, "delete", body, headers);

const put = (endpoint = "", body, headers) =>
  request(endpoint, "put", body, headers);

const patch = (endpoint = "", body, headers) =>
  request(endpoint, "patch", body, headers);

export { get, post, remove, put, patch };
