import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RegistrationGuoyiSuffix } from './registration-guoyi-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RegistrationGuoyiSuffix>;

@Injectable()
export class RegistrationGuoyiSuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/registrations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/registrations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(registration: RegistrationGuoyiSuffix): Observable<EntityResponseType> {
        console.log(registration);
        const copy = this.convert(registration);
        
        return this.http.post<RegistrationGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(registration: RegistrationGuoyiSuffix): Observable<EntityResponseType> {
        const copy = this.convert(registration);
        return this.http.put<RegistrationGuoyiSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RegistrationGuoyiSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RegistrationGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegistrationGuoyiSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RegistrationGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<RegistrationGuoyiSuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegistrationGuoyiSuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RegistrationGuoyiSuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RegistrationGuoyiSuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RegistrationGuoyiSuffix[]>): HttpResponse<RegistrationGuoyiSuffix[]> {
        const jsonResponse: RegistrationGuoyiSuffix[] = res.body;
        const body: RegistrationGuoyiSuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RegistrationGuoyiSuffix.
     */
    private convertItemFromServer(registration: RegistrationGuoyiSuffix): RegistrationGuoyiSuffix {
        const copy: RegistrationGuoyiSuffix = Object.assign({}, registration);
        //copy.gscpjj=copy.gscpjj.replace('\n','&lt;br/&gt;');
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateFromServer(registration.createdDate);
        // copy.modifiedDate = this.dateUtils
        //     .convertLocalDateFromServer(registration.modifiedDate);
        return copy;
    }

    /**
     * Convert a RegistrationGuoyiSuffix to a JSON which can be sent to the server.
     */
    private convert(registration: RegistrationGuoyiSuffix): RegistrationGuoyiSuffix {
        const copy: RegistrationGuoyiSuffix = Object.assign({}, registration);
        // copy.createdDate = this.dateUtils
        //     .convertLocalDateToServer(registration.createdDate);
        // copy.modifiedDate = this.dateUtils
        //     .convertLocalDateToServer(registration.modifiedDate);
        return copy;
    }
}
