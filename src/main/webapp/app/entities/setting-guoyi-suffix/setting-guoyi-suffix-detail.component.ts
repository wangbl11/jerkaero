import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SettingGuoyiSuffix } from './setting-guoyi-suffix.model';
import { SettingGuoyiSuffixService } from './setting-guoyi-suffix.service';

@Component({
    selector: 'jhi-setting-guoyi-suffix-detail',
    templateUrl: './setting-guoyi-suffix-detail.component.html'
})
export class SettingGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    setting: SettingGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private settingService: SettingGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSettings();
    }

    load(id) {
        this.settingService.find(id)
            .subscribe((settingResponse: HttpResponse<SettingGuoyiSuffix>) => {
                this.setting = settingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'settingListModification',
            (response) => this.load(this.setting.id)
        );
    }
}
