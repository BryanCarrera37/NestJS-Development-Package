import { HttpService } from "@nestjs/axios";
import { HttpStatus } from "@nestjs/common";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";

export abstract class ApiService {

    private readonly _http: HttpService;

    /**
     * Basically, it's the config that will be used on each of your requests **(GET, POST, PUT, etc)**
     */
    protected httpRequestConfig: AxiosRequestConfig<any> = {};

    constructor() {
        this._http = new HttpService();
    }

    /**
     * This is a method that you have to define to initialize the member named **httpRequestConfig**
     */
    protected abstract initializeRequestConfig(): void;

    protected get<T>(url: string): Promise<AxiosResponse<T>> {
        return lastValueFrom(this._http.get(url, this.httpRequestConfig));
    }

    protected post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return lastValueFrom(this._http.post(url, data, this.httpRequestConfig));
    }

    protected put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return lastValueFrom(this._http.put(url, data, this.httpRequestConfig));
    }

    protected patch<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return lastValueFrom(this._http.patch(url, data, this.httpRequestConfig));
    }

    protected delete<T>(url: string): Promise<AxiosResponse<T>> {
        return lastValueFrom(this._http.delete(url, this.httpRequestConfig));
    }

    /**
     * 
     * @param statusCode The code in your response
     * @returns **true** if the statusCode is between 200 and 299. Otherwise the result will be **false**
     */
    protected isSuccessfulResponse(statusCode: number): boolean {
        return statusCode >= HttpStatus.OK && statusCode < HttpStatus.AMBIGUOUS;
    }
}