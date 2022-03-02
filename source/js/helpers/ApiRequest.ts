import axios, { AxiosError, Method } from 'axios';

const encodeQueryData = (queryParams: Record<string, string | number | boolean>): string => {
  const data: string[] = [];
  const entries = Object.entries(queryParams);
  entries.forEach(([key, value]) => {
    data.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  return data.join('&');
};

export const buildServiceUrl = async (endpoint = '', params = {}) => {
  const baseUrl = document.getElementById('mh-mount-booking')?.attributes.getNamedItem('data-endpoint')?.nodeValue;
  const queryString = encodeQueryData(params);
  const sanitizedEndpoint = endpoint.replace(/^\/|\/$/g, '');
  const completeUrl = `${baseUrl}/${sanitizedEndpoint}?${queryString}`;

  return completeUrl;
};

const request = async (
  endpoint: string,
  method: Method,
  data?: Record<string, unknown>,
  headers?: Record<string, string>,
  params?: Record<string, string>,
) => {
  const url = await buildServiceUrl(endpoint);

  const newHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  try {
    const req = await axios.request({
      url,
      method,
      headers: newHeaders,
      data,
      params,
    });
    return req;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

const get = (endpoint: string, headers?: Record<string, string>, params?: Record<string, string>) =>
  request(endpoint, 'get', undefined, headers, params);

const post = (endpoint: string, body: Record<string, unknown>, headers?: Record<string, string>) =>
  request(endpoint, 'post', body, headers);

const remove = (endpoint: string, body?: Record<string, unknown>, headers?: Record<string, string>) =>
  request(endpoint, 'delete', body, headers);

const put = (endpoint: string, body: Record<string, unknown>, headers?: Record<string, string>) =>
  request(endpoint, 'put', body, headers);

const patch = (endpoint: string, body: Record<string, unknown>, headers?: Record<string, string>) =>
  request(endpoint, 'patch', body, headers);

export { get, post, remove, put, patch };
