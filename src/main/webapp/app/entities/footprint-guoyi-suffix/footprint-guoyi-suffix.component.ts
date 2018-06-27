import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FootprintGuoyiSuffix } from './footprint-guoyi-suffix.model';
import { FootprintGuoyiSuffixService } from './footprint-guoyi-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-footprint-guoyi-suffix',
    templateUrl: './footprint-guoyi-suffix.component.html'
})
export class FootprintGuoyiSuffixComponent implements OnInit, OnDestroy {
footprints: FootprintGuoyiSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private footprintService: FootprintGuoyiSuffixService,
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
            this.footprintService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<FootprintGuoyiSuffix[]>) => this.footprints = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.footprintService.query().subscribe(
            (res: HttpResponse<FootprintGuoyiSuffix[]>) => {
                this.footprints = res.body;
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
        this.registerChangeInFootprints();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FootprintGuoyiSuffix) {
        return item.id;
    }
    registerChangeInFootprints() {
        this.eventSubscriber = this.eventManager.subscribe('footprintListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
