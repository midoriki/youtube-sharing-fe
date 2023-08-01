import { API_BASE_URL } from '@config/config';
import axios, { AxiosRequestConfig } from 'axios';

export class Api {
  static token: string;

  private instance = axios.create({
    baseURL: `${API_BASE_URL}`,
  });

  private mergeHeaders (headers: any) {
    return {
      ...(headers || {}),
      Authorization: `Bearer ${Api.token}`,
    };
  }

  async get (url: string, option?: AxiosRequestConfig) {
    return this.instance.get(url, {
      ...option,
      headers: this.mergeHeaders(option?.headers),
    });
  }

  async post (url: string, data: any, option?: AxiosRequestConfig) {
    return this.instance.post(url, data, {
      ...option,
      headers: this.mergeHeaders(option?.headers),
    });
  }
}

const api = new Api();

export default api;
