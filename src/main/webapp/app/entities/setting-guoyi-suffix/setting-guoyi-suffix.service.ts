import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SettingGuoyiSuffix } from './setting-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SettingGuoyiSuffix>;

@Injectable()
export class SettingGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/settings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/settings';

    constructor(private http: HttpClient) { }

    create(setting: SettingGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(setting);
        return this.http.post<SettingGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(setting: SettingGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(setting);
        return this.http.put<SettingGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SettingGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SettingGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SettingGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SettingGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SettingGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SettingGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SettingGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SettingGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SettingGuoyiSuffix[]>): HttpResponse<SettingGuoyiSuffix[]> {
        const jsonResponse: SettingGuoyiSuffix[] = res.body;
        const body: SettingGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SettingGuoyiSuffix.
     */
    private convertItemFromServer(setting: SettingGuoyiSuffix): SettingGuoyiSuffix {
        const copy: SettingGuoyiSuffix = Object.assign({}, setting);
        return copy;
    }

    /**
     * Convert a SettingGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(setting: SettingGuoyiSuffix): SettingGuoyiSuffix {
        const copy: SettingGuoyiSuffix = Object.assign({}, setting);
        return copy;
    }
}
