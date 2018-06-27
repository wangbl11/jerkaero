import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GlobalSettingGuoyiSuffix } from './global-setting-guoyi-suffix.model';
import { GlobalSettingGuoyiSuffixPopupService } from './global-setting-guoyi-suffix-popup.service';
import { GlobalSettingGuoyiSuffixService } from './global-setting-guoyi-suffix.service';

@Component({
    selector: 'jhi-global-setting-guoyi-suffix-dialog',
    templateUrl: './global-setting-guoyi-suffix-dialog.component.html'
})
export class GlobalSettingGuoyiSuffixDialogComponent implements OnInit {

    globalSetting: GlobalSettingGuoyiSuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private globalSettingService: GlobalSettingGuoyiSuffixService,
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
        if (this.globalSetting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.globalSettingService.update(this.globalSetting));
        } else {
            this.subscribeToSaveResponse(
                this.globalSettingService.create(this.globalSetting));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GlobalSettingGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<GlobalSettingGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GlobalSettingGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'globalSettingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-global-setting-guoyi-suffix-popup',
    template: ''
})
export class GlobalSettingGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private globalSettingPopupService: GlobalSettingGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.globalSettingPopupService
                    .open(GlobalSettingGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.globalSettingPopupService
                    .open(GlobalSettingGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
