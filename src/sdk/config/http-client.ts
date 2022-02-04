import { API_NAMESPACE, API_NAMESPACE_VX } from './environment';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const SERVER_URL = 
  process.env.NODE_ENV === 'development' ? 'https://content-yoda.smartlife.vodafo.ne' : null;


const defaultAxiosOptions = {
  baseUrl: 'https://content-yoda.smartlife.vodafo.ne',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cookie' : 'SESSION=ZWY2ODIyZGQtNzFiZi00MGY0LTk2MDctZDI2MzYyYjI0YTI1'
  },
  withCredentials: true
}

function patchVersionAPI (config?: AxiosRequestConfig, version?: number, useHttps?: boolean) :AxiosRequestConfig {

  let patchConfig = {...config};

  if(version) patchConfig.baseURL = API_NAMESPACE_VX + version;

  return patchConfig
}

class HttpClient {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: API_NAMESPACE,
      ...defaultAxiosOptions
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig, apiVersion?: number): Promise<R> {
    return this.http.request(patchVersionAPI(config, apiVersion));
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig, apiVersion?: number): Promise<R> {
    return this.http.get<T, R>(url, patchVersionAPI(config, apiVersion));
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
    apiVersion?: number
  ): Promise<R> {
    return this.http.post<T, R>(url, data, patchVersionAPI(config, apiVersion));
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
    apiVersion?: number
  ): Promise<R> {
    return this.http.put<T, R>(url, data, patchVersionAPI(config, apiVersion));
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig, apiVersion?: number): Promise<R> {
    return this.http.delete<T, R>(url, patchVersionAPI(config, apiVersion));
  }

  // TODO handle API errors properly
  private handleError(error: any) {
    console.log(error);
    return Promise.reject(error);
  }
}

export const http = new HttpClient();
