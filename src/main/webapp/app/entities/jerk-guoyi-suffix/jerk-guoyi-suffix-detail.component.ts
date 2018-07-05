import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JerkGuoyiSuffix } from './jerk-guoyi-suffix.model';
import { JerkGuoyiSuffixService } from './jerk-guoyi-suffix.service';

@Component({
    selector: 'jhi-jerk-guoyi-suffix-detail',
    templateUrl: './jerk-guoyi-suffix-detail.component.html'
})
export class JerkGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    jerk: JerkGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    constructor(
        private eventManager: JhiEventManager,
        private jerkService: JerkGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJerks();
    }

    load(id) {
        this.jerkService.find(id)
            .subscribe((jerkResponse: HttpResponse<JerkGuoyiSuffix>) => {
                this.jerk = jerkResponse.body;
                if (!this.jerk.preference)
                   this.jerk.preference={};
            });
    }
    
    setActive(jerk,sts){
        jerk.authStatus = sts?'A1':'A0';

        this.jerkService.update(jerk).subscribe(
            (response) => {
                if (response.status === 200) {
                this.jerk = response.body;
                   // this.error = null;
                   // this.success = 'OK';
                   // this.loadAll();
                } else {
                   // this.success = null;
                   // this.error = 'ERROR';
                }
            });
    }
    
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJerks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jerkListModification',
            (response) => this.load(this.jerk.id)
        );
    }
}
