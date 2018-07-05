import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JerkGuoyiSuffix } from './jerk-guoyi-suffix.model';
import { JerkGuoyiSuffixPopupService } from './jerk-guoyi-suffix-popup.service';
import { JerkGuoyiSuffixService } from './jerk-guoyi-suffix.service';
import { RegistrationGuoyiSuffix, RegistrationGuoyiSuffixService } from '../registration-guoyi-suffix';
import { PreferenceGuoyiSuffix, PreferenceGuoyiSuffixService } from '../preference-guoyi-suffix';


@Component({
    selector: 'jhi-jerk-guoyi-suffix-dialog',
    templateUrl: './jerk-guoyi-suffix-dialog.component.html'
})
export class JerkGuoyiSuffixDialogComponent implements OnInit, OnDestroy {

    jerk: JerkGuoyiSuffix;
    private subscription: any;
    private eventSubscriber: any;
    isSaving: boolean;
    constructor(
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private jerkService: JerkGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        //this.registerChangeInJerks();
    }

    load(id) {
        this.jerkService.find(id)
            .subscribe((jerkResponse: HttpResponse<JerkGuoyiSuffix>) => {
                this.jerk = jerkResponse.body;
               // console.log(this.jerk);
            });
    }
    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jerk.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jerkService.update(this.jerk));
        } else {
            this.subscribeToSaveResponse(
                this.jerkService.create(this.jerk));
        }
    }
    
    private subscribeToSaveResponse(result: Observable<HttpResponse<JerkGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<JerkGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JerkGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'jerkListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/jerk-guoyi-suffix']);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
        //this.eventManager.destroy(this.eventSubscriber);
    }

}
