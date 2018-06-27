import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PreferenceGuoyiSuffix } from './preference-guoyi-suffix.model';
import { PreferenceGuoyiSuffixService } from './preference-guoyi-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-preference-guoyi-suffix',
    templateUrl: './preference-guoyi-suffix.component.html'
})
export class PreferenceGuoyiSuffixComponent implements OnInit, OnDestroy {
preferences: PreferenceGuoyiSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private preferenceService: PreferenceGuoyiSuffixService,
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
            this.preferenceService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<PreferenceGuoyiSuffix[]>) => this.preferences = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.preferenceService.query().subscribe(
            (res: HttpResponse<PreferenceGuoyiSuffix[]>) => {
                this.preferences = res.body;
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
        this.registerChangeInPreferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PreferenceGuoyiSuffix) {
        return item.id;
    }
    registerChangeInPreferences() {
        this.eventSubscriber = this.eventManager.subscribe('preferenceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
