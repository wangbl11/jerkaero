import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MessageTextGuoyiSuffix } from './message-text-guoyi-suffix.model';
import { createRequestOption,BaseEntity } from '../../shared';

export type EntityResponseType = HttpResponse<MessageTextGuoyiSuffix>;

@Injectable()
export class MessageTextGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/message-texts';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/message-texts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    // create(messageText: MessageTextGuoyiSuffix,recIDs:number[]): Observable<EntityResponseType> {
    //     const copy = this.convert(messageText);
    //     copy.recIDs=recIDs;
    //     return this.http.post<MessageTextGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
    //         .map((res: EntityResponseType) => this.convertResponse(res));
    // }

    create(messageText: MessageTextGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(messageText);
        return this.http.post<MessageTextGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(messageText: MessageTextGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(messageText);
        return this.http.put<MessageTextGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MessageTextGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MessageTextGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageTextGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageTextGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MessageTextGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageTextGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageTextGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MessageTextGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MessageTextGuoyiSuffix[]>): HttpResponse<MessageTextGuoyiSuffix[]> {
        const jsonResponse: MessageTextGuoyiSuffix[] = res.body;
        const body: MessageTextGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MessageTextGuoyiSuffix.
     */
    private convertItemFromServer(messageText: MessageTextGuoyiSuffix): MessageTextGuoyiSuffix {
        const copy: MessageTextGuoyiSuffix = Object.assign({}, messageText);
        // copy.createdDate = this.dateUtils
        //     .convertDateTimeFromServer(messageText.createdDate);
        return copy;
    }

    /**
     * Convert a MessageTextGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(messageText: MessageTextGuoyiSuffix): MessageTextGuoyiSuffix {
        const copy: MessageTextGuoyiSuffix = Object.assign({}, messageText);
        // copy.createdDate = this.dateUtils.toDate(messageText.createdDate);
        return copy;
    }
}
