import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { GlobalSettingGuoyiSuffix } from './global-setting-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GlobalSettingGuoyiSuffix>;

@Injectable()
export class GlobalSettingGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/global-settings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/global-settings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(globalSetting: GlobalSettingGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(globalSetting);
        return this.http.post<GlobalSettingGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(globalSetting: GlobalSettingGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(globalSetting);
        return this.http.put<GlobalSettingGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GlobalSettingGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GlobalSettingGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<GlobalSettingGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GlobalSettingGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<GlobalSettingGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<GlobalSettingGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GlobalSettingGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GlobalSettingGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GlobalSettingGuoyiSuffix[]>): HttpResponse<GlobalSettingGuoyiSuffix[]> {
        const jsonResponse: GlobalSettingGuoyiSuffix[] = res.body;
        const body: GlobalSettingGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GlobalSettingGuoyiSuffix.
     */
    private convertItemFromServer(globalSetting: GlobalSettingGuoyiSuffix): GlobalSettingGuoyiSuffix {
        const copy: GlobalSettingGuoyiSuffix = Object.assign({}, globalSetting);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(globalSetting.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(globalSetting.modifiedDate);
        return copy;
    }

    /**
     * Convert a GlobalSettingGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(globalSetting: GlobalSettingGuoyiSuffix): GlobalSettingGuoyiSuffix {
        const copy: GlobalSettingGuoyiSuffix = Object.assign({}, globalSetting);

        copy.createdDate = this.dateUtils.toDate(globalSetting.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(globalSetting.modifiedDate);
        return copy;
    }
}
