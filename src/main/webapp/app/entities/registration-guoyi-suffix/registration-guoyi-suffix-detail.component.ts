import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RegistrationGuoyiSuffix } from './registration-guoyi-suffix.model';
import { RegistrationGuoyiSuffixService } from './registration-guoyi-suffix.service';

@Component({
    selector: 'jhi-registration-guoyi-suffix-detail',
    templateUrl: './registration-guoyi-suffix-detail.component.html'
})
export class RegistrationGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    registration: RegistrationGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private registrationService: RegistrationGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegistrations();
    }

    load(id) {
        this.registrationService.find(id)
            .subscribe((registrationResponse: HttpResponse<RegistrationGuoyiSuffix>) => {
                this.registration = registrationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'registrationListModification',
            (response) => this.load(this.registration.id)
        );
    }
}
