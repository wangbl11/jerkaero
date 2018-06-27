import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

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
export class JerkGuoyiSuffixDialogComponent implements OnInit {

    jerk: JerkGuoyiSuffix;
    isSaving: boolean;
    routeSub: any;

    jerkinfos: RegistrationGuoyiSuffix[];

    preferences: PreferenceGuoyiSuffix[];
    createdDateDp: any;
    modifiedDateDp: any;

    constructor(
       //public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jerkService: JerkGuoyiSuffixService,
        private registrationService: RegistrationGuoyiSuffixService,
        private preferenceService: PreferenceGuoyiSuffixService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jerkService.find(params['id'])
                    .subscribe((jerkResponse: HttpResponse<JerkGuoyiSuffix>) => {
                        this.jerk = jerkResponse.body;
                    });
            } else {
                 //new jerk
            }
        });
        // this.preferenceService
        //     .query({filter: 'jerk-is-null'})
        //     .subscribe((res: HttpResponse<PreferenceGuoyiSuffix[]>) => {
        //         if (!this.jerk.preference || !this.jerk.preference.id) {
        //             this.preferences = res.body;
        //         } else {
        //             this.preferenceService
        //                 .find(this.jerk.preference.id)
        //                 .subscribe((subRes: HttpResponse<PreferenceGuoyiSuffix>) => {
        //                     this.preferences = [subRes.body].concat(res.body);
        //                 }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
        //         }
        //     }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        //this.activeModal.dismiss('cancel');
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
        //this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRegistrationById(index: number, item: RegistrationGuoyiSuffix) {
        return item.id;
    }

    trackPreferenceById(index: number, item: PreferenceGuoyiSuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-jerk-guoyi-suffix-popup',
    template: ''
})
export class JerkGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jerkPopupService: JerkGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jerkPopupService
                    .open(JerkGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.jerkPopupService
                    .open(JerkGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
