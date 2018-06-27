import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegistrationGuoyiSuffix } from './registration-guoyi-suffix.model';
import { RegistrationGuoyiSuffixPopupService } from './registration-guoyi-suffix-popup.service';
import { RegistrationGuoyiSuffixService } from './registration-guoyi-suffix.service';

@Component({
    selector: 'jhi-registration-guoyi-suffix-dialog',
    templateUrl: './registration-guoyi-suffix-dialog.component.html'
})
export class RegistrationGuoyiSuffixDialogComponent implements OnInit {

    registration: RegistrationGuoyiSuffix;
    isSaving: boolean;
    createdDateDp: any;
    modifiedDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private registrationService: RegistrationGuoyiSuffixService,
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
        if (this.registration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registrationService.update(this.registration));
        } else {
            this.subscribeToSaveResponse(
                this.registrationService.create(this.registration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RegistrationGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<RegistrationGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RegistrationGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'registrationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-registration-guoyi-suffix-popup',
    template: ''
})
export class RegistrationGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationPopupService: RegistrationGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.registrationPopupService
                    .open(RegistrationGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.registrationPopupService
                    .open(RegistrationGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
