import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SettingGuoyiSuffix } from './setting-guoyi-suffix.model';
import { SettingGuoyiSuffixService } from './setting-guoyi-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-setting-guoyi-suffix',
    templateUrl: './setting-guoyi-suffix.component.html'
})
export class SettingGuoyiSuffixComponent implements OnInit, OnDestroy {
    settings: SettingGuoyiSuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    predicate: any;
    reverse: any;

    constructor(
        private settingService: SettingGuoyiSuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private router: Router,
    ) {
    this.settings = [];

        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.settingService.search({
                query: this.currentSearch,
                sort: this.sort()}).subscribe(
                    (res: HttpResponse<SettingGuoyiSuffix[]>) => this.settings = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.settingService.query({sort: this.sort()}).subscribe(
            (res: HttpResponse<SettingGuoyiSuffix[]>) => {
                this.settings = res.body;
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
    transition() {
        console.log('transition');
        this.router.navigate(['/setting-guoyi-suffix'], {queryParams:
             {
                 search: this.currentSearch,
                 sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
             }
         });
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
        this.registerChangeInSettings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SettingGuoyiSuffix) {
        return item.id;
    }
    registerChangeInSettings() {
        this.eventSubscriber = this.eventManager.subscribe('settingListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
