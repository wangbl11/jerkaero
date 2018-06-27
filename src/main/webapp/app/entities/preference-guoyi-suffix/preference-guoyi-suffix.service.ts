import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PreferenceGuoyiSuffix } from './preference-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PreferenceGuoyiSuffix>;

@Injectable()
export class PreferenceGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/preferences';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/preferences';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(preference: PreferenceGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(preference);
        return this.http.post<PreferenceGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(preference: PreferenceGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(preference);
        return this.http.put<PreferenceGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PreferenceGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PreferenceGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PreferenceGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PreferenceGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PreferenceGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PreferenceGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PreferenceGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PreferenceGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PreferenceGuoyiSuffix[]>): HttpResponse<PreferenceGuoyiSuffix[]> {
        const jsonResponse: PreferenceGuoyiSuffix[] = res.body;
        const body: PreferenceGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PreferenceGuoyiSuffix.
     */
    private convertItemFromServer(preference: PreferenceGuoyiSuffix): PreferenceGuoyiSuffix {
        const copy: PreferenceGuoyiSuffix = Object.assign({}, preference);
        copy.createdDate = this.dateUtils
            .convertLocalDateFromServer(preference.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertLocalDateFromServer(preference.modifiedDate);
        return copy;
    }

    /**
     * Convert a PreferenceGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(preference: PreferenceGuoyiSuffix): PreferenceGuoyiSuffix {
        const copy: PreferenceGuoyiSuffix = Object.assign({}, preference);
        copy.createdDate = this.dateUtils
            .convertLocalDateToServer(preference.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertLocalDateToServer(preference.modifiedDate);
        return copy;
    }
}
