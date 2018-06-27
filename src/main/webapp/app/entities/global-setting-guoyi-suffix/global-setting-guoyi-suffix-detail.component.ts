import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GlobalSettingGuoyiSuffix } from './global-setting-guoyi-suffix.model';
import { GlobalSettingGuoyiSuffixService } from './global-setting-guoyi-suffix.service';

@Component({
    selector: 'jhi-global-setting-guoyi-suffix-detail',
    templateUrl: './global-setting-guoyi-suffix-detail.component.html'
})
export class GlobalSettingGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    globalSetting: GlobalSettingGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private globalSettingService: GlobalSettingGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGlobalSettings();
    }

    load(id) {
        this.globalSettingService.find(id)
            .subscribe((globalSettingResponse: HttpResponse<GlobalSettingGuoyiSuffix>) => {
                this.globalSetting = globalSettingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGlobalSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'globalSettingListModification',
            (response) => this.load(this.globalSetting.id)
        );
    }
}
