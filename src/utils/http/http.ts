/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpError from './httpError';
import queryString, { isPlainObject } from './queryStringify';

export enum HttpMethods {
    Get = 'GET',
    Put =  'PUT',
    Post = 'POST',
    Delete = 'DELETE'
}

interface HttpRequestOptions {
    method: HttpMethods;
    data?: any;
    headers?: Record<string, string>;
    responseTransformer?: (response: any) => any;
    requestType?: 'json' | 'file';
}

type HttpRequestOptionsWithoutMethod = Omit<HttpRequestOptions, 'method'>;

// код взял у себя же, писал его в рамках практикума
export default class HTTPTransport {
    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    private _baseUrl: string;

    private readonly _defaultOptions: HttpRequestOptions = {
        method: HttpMethods.Get,
        requestType: 'json'
    };

    get<T>(url: string, options: HttpRequestOptionsWithoutMethod = {}): Promise<T> {
        if (options.data && isPlainObject(options.data)) {
            url += '?' + queryString(options.data);
        }

        return this.request<T>(url, { ...options, method: HttpMethods.Get });
    }

    put<T>(url: string, options: HttpRequestOptionsWithoutMethod = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: HttpMethods.Put });
    }

    post<T>(url: string, options: HttpRequestOptionsWithoutMethod = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: HttpMethods.Post });
    }

    delete<T>(url: string, options: HttpRequestOptionsWithoutMethod = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: HttpMethods.Delete });
    }

    async request<T=any>(url: string, options: HttpRequestOptions): Promise<T> {

        const mergedOptions: HttpRequestOptions = Object.assign({}, this._defaultOptions, options);

        const headers: Record<string, string> = {};
        if (mergedOptions.headers) {
            for (const [ key, value ] of Object.entries(mergedOptions.headers)) {
                headers[key] = value;
            }
        }

        if (mergedOptions.requestType && mergedOptions.requestType === 'json') {
            headers['Content-Type'] = 'application/json; charset=utf-8';
        }

        let body: any | undefined = undefined;
        if (mergedOptions.method !== HttpMethods.Get && mergedOptions.data) {
            body = mergedOptions.requestType === 'json'
                ? JSON.stringify(mergedOptions.data)
                : mergedOptions.data;
        }

        const response = await fetch(
            `${this._baseUrl}${url}`,
            {
                method: mergedOptions.method,
                body: body,
                headers: headers
            }
        );

        if (response.ok) {
            const contentTypeHeaderValue = response.headers.get('Content-Type');

            let result: any;

            if (contentTypeHeaderValue?.includes('application/json')) {
                result = await response.json();
                if (mergedOptions.responseTransformer) {
                    result = this.transformResponse(result, mergedOptions.responseTransformer);
                }
            }
            else {
                result = await response.text();
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result;
        }
        else {
            const errorMsg = await response.json();
            throw new HttpError('Ошибка', response.status, errorMsg);
        }
    }

    private transformResponse(value: unknown, transformer: (value: unknown) => unknown) {
        if (Array.isArray(value)) {
            return value.map((item) => {
                return transformer(item);
            });
        }
        else {
            return transformer(value);
        }
    }
}
