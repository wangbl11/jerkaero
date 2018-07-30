import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JerkGuoyiSuffix,JerkSimpleGuoyiSuffix } from './jerk-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JerkGuoyiSuffix>;

@Injectable()
export class JerkGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/jerks';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/jerks';
    private resourceSimpleUrl =  SERVER_API_URL + 'api/simplejerks';
    private resourceSimpleSearchUrl = SERVER_API_URL + 'api/_search/simplejerks';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(jerk: JerkGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(jerk);
        return this.http.post<JerkGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jerk: JerkGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(jerk);
        if (copy.preference&&!copy.preference['id']&&!copy.preference['wechat'])
             copy.preference=null;
        
        return this.http.put<JerkGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JerkGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JerkGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<JerkGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JerkGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }
    querySimple(req?: any): Observable<HttpResponse<JerkGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<JerkGuoyiSuffix[]>(this.resourceSimpleUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JerkGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<JerkGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<JerkGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JerkGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    searchSimple(req?: any): Observable<HttpResponse<JerkGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<JerkSimpleGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JerkGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JerkGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JerkGuoyiSuffix[]>): HttpResponse<JerkGuoyiSuffix[]> {
        const jsonResponse: JerkGuoyiSuffix[] = res.body;
        const body: JerkGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JerkGuoyiSuffix.
     */
    private convertItemFromServer(jerk: JerkGuoyiSuffix): JerkGuoyiSuffix {
        const copy: JerkGuoyiSuffix = Object.assign({}, jerk);
        if (!copy.preference) copy.preference={};
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateFromServer(jerk.createdDate);
        // copy.modifiedDate = this.dateUtils
        //     .convertLocalDateFromServer(jerk.modifiedDate);
        // console.log(copy.modifiedDate);
        return copy;
    }

    /**
     * Convert a JerkGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(jerk: JerkGuoyiSuffix): JerkGuoyiSuffix {
        const copy: JerkGuoyiSuffix = Object.assign({}, jerk);
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateToServer(jerk.createdDate);
        // copy.modifiedDate = this.dateUtils
        //     .convertLocalDateToServer(jerk.modifiedDate);
        /*
        if (copy.preference){
           console.log('&&&&&&&&&&&&&&&&&&&')
           copy.preference.jerk=copy.id;
        }
        */
        return copy;
    }
}
