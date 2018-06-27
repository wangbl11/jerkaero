import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RegistrationGuoyiSuffix } from './registration-guoyi-suffix.model';
import { RegistrationGuoyiSuffixService } from './registration-guoyi-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-registration-guoyi-suffix',
    templateUrl: './registration-guoyi-suffix.component.html'
})
export class RegistrationGuoyiSuffixComponent implements OnInit, OnDestroy {
registrations: RegistrationGuoyiSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private registrationService: RegistrationGuoyiSuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.registrationService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<RegistrationGuoyiSuffix[]>) => this.registrations = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.registrationService.query().subscribe(
            (res: HttpResponse<RegistrationGuoyiSuffix[]>) => {
                this.registrations = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRegistrations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RegistrationGuoyiSuffix) {
        return item.id;
    }
    registerChangeInRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe('registrationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
