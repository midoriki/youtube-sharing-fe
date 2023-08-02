import { API_BASE_URL } from '@config/config';
import User from '@interfaces/User';
import axios, { AxiosRequestConfig } from 'axios';
import { clearToken, retrieveToken, storeToken } from './auth/storage';

export class Api {
  static token: string | null = retrieveToken();

  private instance = axios.create({
    baseURL: `${API_BASE_URL}`,
  });

  private mergeHeaders (headers: any) {
    return {
      ...(headers || {}),
      Authorization: `Bearer ${Api.token}`,
    };
  }

  async get<T> (url: string, option?: AxiosRequestConfig) {
    return this.instance.get<T>(url, {
      ...option,
      headers: this.mergeHeaders(option?.headers),
    });
  }

  async post<T> (url: string, data: any, option?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, {
      ...option,
      headers: this.mergeHeaders(option?.headers),
    });
  }
}

const api = new Api();

export async function login (data: {email: string, password: string}) {
  const response = await api.post<{token: string}>('/auth/login', data);
  if (response.data.token) {
    Api.token = response.data.token;
    storeToken(response.data.token);
  }
}

export async function register (data: { email: string, password: string, passwordConfirmation: string }) {
  const response = await api.post<{ token: string }>('/auth/register', data);
  if (response.data.token) {
    Api.token = response.data.token;
    storeToken(response.data.token);
  }
}

export async function getProfile (): Promise<User | null> {
  if (Api.token) {
    try {
      const response = await api.get<{ user: User }>('/profile');
      return response.data.user;
    } catch (error) {
      clearToken();
      Api.token = null;
      return null;
    }
  }
  return null;
}

export default api;
