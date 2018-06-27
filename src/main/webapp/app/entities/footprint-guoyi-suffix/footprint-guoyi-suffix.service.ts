import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FootprintGuoyiSuffix } from './footprint-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FootprintGuoyiSuffix>;

@Injectable()
export class FootprintGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/footprints';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/footprints';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(footprint: FootprintGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(footprint);
        return this.http.post<FootprintGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(footprint: FootprintGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(footprint);
        return this.http.put<FootprintGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FootprintGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FootprintGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FootprintGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FootprintGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<FootprintGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FootprintGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FootprintGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FootprintGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FootprintGuoyiSuffix[]>): HttpResponse<FootprintGuoyiSuffix[]> {
        const jsonResponse: FootprintGuoyiSuffix[] = res.body;
        const body: FootprintGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FootprintGuoyiSuffix.
     */
    private convertItemFromServer(footprint: FootprintGuoyiSuffix): FootprintGuoyiSuffix {
        const copy: FootprintGuoyiSuffix = Object.assign({}, footprint);
        copy.createdDate = this.dateUtils
            .convertLocalDateFromServer(footprint.createdDate);
        return copy;
    }

    /**
     * Convert a FootprintGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(footprint: FootprintGuoyiSuffix): FootprintGuoyiSuffix {
        const copy: FootprintGuoyiSuffix = Object.assign({}, footprint);
        copy.createdDate = this.dateUtils
            .convertLocalDateToServer(footprint.createdDate);
        return copy;
    }
}
