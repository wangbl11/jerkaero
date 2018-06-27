import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SettingGuoyiSuffix } from './setting-guoyi-suffix.model';
import { SettingGuoyiSuffixPopupService } from './setting-guoyi-suffix-popup.service';
import { SettingGuoyiSuffixService } from './setting-guoyi-suffix.service';

@Component({
    selector: 'jhi-setting-guoyi-suffix-dialog',
    templateUrl: './setting-guoyi-suffix-dialog.component.html'
})
export class SettingGuoyiSuffixDialogComponent implements OnInit {

    setting: SettingGuoyiSuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private settingService: SettingGuoyiSuffixService,
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
        if (this.setting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.settingService.update(this.setting));
        } else {
            this.subscribeToSaveResponse(
                this.settingService.create(this.setting));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SettingGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<SettingGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SettingGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'settingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-setting-guoyi-suffix-popup',
    template: ''
})
export class SettingGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private settingPopupService: SettingGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.settingPopupService
                    .open(SettingGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.settingPopupService
                    .open(SettingGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
