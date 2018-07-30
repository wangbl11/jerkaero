import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MessageGuoyiSuffix } from './message-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MessageGuoyiSuffix>;

@Injectable()
export class MessageGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/messages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/messages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(message: MessageGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(message);
        return this.http.post<MessageGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(message: MessageGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(message);
        return this.http.put<MessageGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MessageGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MessageGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MessageGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MessageGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MessageGuoyiSuffix[]>): HttpResponse<MessageGuoyiSuffix[]> {
        const jsonResponse: MessageGuoyiSuffix[] = res.body;
        const body: MessageGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MessageGuoyiSuffix.
     */
    private convertItemFromServer(message: MessageGuoyiSuffix): MessageGuoyiSuffix {
        const copy: MessageGuoyiSuffix = Object.assign({}, message);
        copy.readDate = this.dateUtils
            .convertDateTimeFromServer(message.readDate);
        return copy;
    }

    /**
     * Convert a MessageGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(message: MessageGuoyiSuffix): MessageGuoyiSuffix {
        const copy: MessageGuoyiSuffix = Object.assign({}, message);

        copy.readDate = this.dateUtils.toDate(message.readDate);
        return copy;
    }
}
