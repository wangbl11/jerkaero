import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MailboxGuoyiSuffix } from './mailbox-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MailboxGuoyiSuffix>;

@Injectable()
export class MailboxGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/mailboxes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/mailboxes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(mailbox: MailboxGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(mailbox);
        return this.http.post<MailboxGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mailbox: MailboxGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(mailbox);
        return this.http.put<MailboxGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MailboxGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MailboxGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MailboxGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MailboxGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MailboxGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MailboxGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MailboxGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MailboxGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MailboxGuoyiSuffix[]>): HttpResponse<MailboxGuoyiSuffix[]> {
        const jsonResponse: MailboxGuoyiSuffix[] = res.body;
        const body: MailboxGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MailboxGuoyiSuffix.
     */
    private convertItemFromServer(mailbox: MailboxGuoyiSuffix): MailboxGuoyiSuffix {
        const copy: MailboxGuoyiSuffix = Object.assign({}, mailbox);
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateFromServer(mailbox.createdDate);
        // copy.readDate = this.dateUtils
        //     .convertLocalDateFromServer(mailbox.readDate);
        return copy;
    }

    /**
     * Convert a MailboxGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(mailbox: MailboxGuoyiSuffix): MailboxGuoyiSuffix {
        const copy: MailboxGuoyiSuffix = Object.assign({}, mailbox);
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateToServer(mailbox.createdDate);
        // copy.readDate = this.dateUtils
        //     .convertLocalDateToServer(mailbox.readDate);
        return copy;
    }
}
