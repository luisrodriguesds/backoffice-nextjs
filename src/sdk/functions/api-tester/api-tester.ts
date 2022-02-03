import { AxiosRequestConfig, Method } from 'axios';
import {http} from '../../config/http-client';

export default function customRequest(apiVersion: number, url: string, method: Method, payload? :any, headers? :Object) {

  const config :AxiosRequestConfig = {
    url,
    method,
    headers,
    data: payload
  }

  return http.request(config, apiVersion);

}
