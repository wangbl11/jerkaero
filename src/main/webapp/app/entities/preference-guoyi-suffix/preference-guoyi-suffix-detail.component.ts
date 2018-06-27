import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PreferenceGuoyiSuffix } from './preference-guoyi-suffix.model';
import { PreferenceGuoyiSuffixService } from './preference-guoyi-suffix.service';

@Component({
    selector: 'jhi-preference-guoyi-suffix-detail',
    templateUrl: './preference-guoyi-suffix-detail.component.html'
})
export class PreferenceGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    preference: PreferenceGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private preferenceService: PreferenceGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPreferences();
    }

    load(id) {
        this.preferenceService.find(id)
            .subscribe((preferenceResponse: HttpResponse<PreferenceGuoyiSuffix>) => {
                this.preference = preferenceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPreferences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'preferenceListModification',
            (response) => this.load(this.preference.id)
        );
    }
}
