import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PreferenceGuoyiSuffix } from './preference-guoyi-suffix.model';
import { PreferenceGuoyiSuffixPopupService } from './preference-guoyi-suffix-popup.service';
import { PreferenceGuoyiSuffixService } from './preference-guoyi-suffix.service';

@Component({
    selector: 'jhi-preference-guoyi-suffix-dialog',
    templateUrl: './preference-guoyi-suffix-dialog.component.html'
})
export class PreferenceGuoyiSuffixDialogComponent implements OnInit {

    preference: PreferenceGuoyiSuffix;
    isSaving: boolean;
    createdDateDp: any;
    modifiedDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private preferenceService: PreferenceGuoyiSuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.preference.id !== undefined) {
            this.subscribeToSaveResponse(
                this.preferenceService.update(this.preference));
        } else {
            this.subscribeToSaveResponse(
                this.preferenceService.create(this.preference));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PreferenceGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<PreferenceGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PreferenceGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'preferenceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-preference-guoyi-suffix-popup',
    template: ''
})
export class PreferenceGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preferencePopupService: PreferenceGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.preferencePopupService
                    .open(PreferenceGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.preferencePopupService
                    .open(PreferenceGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
