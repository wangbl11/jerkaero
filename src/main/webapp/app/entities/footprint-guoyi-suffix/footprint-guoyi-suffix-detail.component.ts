import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FootprintGuoyiSuffix } from './footprint-guoyi-suffix.model';
import { FootprintGuoyiSuffixService } from './footprint-guoyi-suffix.service';

@Component({
    selector: 'jhi-footprint-guoyi-suffix-detail',
    templateUrl: './footprint-guoyi-suffix-detail.component.html'
})
export class FootprintGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    footprint: FootprintGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private footprintService: FootprintGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFootprints();
    }

    load(id) {
        this.footprintService.find(id)
            .subscribe((footprintResponse: HttpResponse<FootprintGuoyiSuffix>) => {
                this.footprint = footprintResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFootprints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'footprintListModification',
            (response) => this.load(this.footprint.id)
        );
    }
}
