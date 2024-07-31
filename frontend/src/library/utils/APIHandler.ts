import axios, { AxiosRequestConfig } from 'axios';
import { ConfigHandler } from './ConfigHandler';
import { LocalStorageHandler } from './LocalStorageHandler';

export class APIHandler {

    static async request<T>(
        endpoint: string,
        method: AxiosRequestConfig['method'],
        data?: any,
        sendAsParams?: boolean
    ): Promise<T> {

        const apiUrl = ConfigHandler.getConfig().API_URL;
        const token = LocalStorageHandler.getUserSession().token;

        try {
            const requestObject: AxiosRequestConfig = {
                url: `${apiUrl}/${endpoint}`,
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            if (sendAsParams && method === 'GET') {
                requestObject.params = data;
            } else {
                requestObject.data = data;
            }

            const response = await axios.request<T>(requestObject);

            return response.data;
        } catch (error) {
            throw error;
        }
    };
}