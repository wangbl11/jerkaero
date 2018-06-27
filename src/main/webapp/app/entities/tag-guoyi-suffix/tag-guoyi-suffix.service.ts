import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TagGuoyiSuffix } from './tag-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TagGuoyiSuffix>;

@Injectable()
export class TagGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tags';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tags';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tag: TagGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(tag);
        return this.http.post<TagGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tag: TagGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(tag);
        return this.http.put<TagGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TagGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TagGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TagGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TagGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TagGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TagGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TagGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TagGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TagGuoyiSuffix[]>): HttpResponse<TagGuoyiSuffix[]> {
        const jsonResponse: TagGuoyiSuffix[] = res.body;
        const body: TagGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TagGuoyiSuffix.
     */
    private convertItemFromServer(tag: TagGuoyiSuffix): TagGuoyiSuffix {
        const copy: TagGuoyiSuffix = Object.assign({}, tag);
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateFromServer(tag.createdDate);
        // copy.modifiedDate = this.dateUtils
        //     .convertLocalDateFromServer(tag.modifiedDate);
        // copy.createdDate=this.dateUtils.toDate(tag.createdDate);
        // copy.modifiedDate=this.dateUtils.toDate(tag.modifiedDate);
        console.log('+++++++++++++++++');
        console.log(tag.createdDate);
        return copy;
    }

    /**
     * Convert a TagGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(tag: TagGuoyiSuffix): TagGuoyiSuffix {
        const copy: TagGuoyiSuffix = Object.assign({}, tag);
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateToServer(tag.createdDate);
        // copy.modifiedDate = this.dateUtils
        //     .convertLocalDateToServer(tag.modifiedDate);
        return copy;
    }
}
