import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FootprintGuoyiSuffix } from './footprint-guoyi-suffix.model';
import { FootprintGuoyiSuffixPopupService } from './footprint-guoyi-suffix-popup.service';
import { FootprintGuoyiSuffixService } from './footprint-guoyi-suffix.service';
import { JerkGuoyiSuffix, JerkGuoyiSuffixService } from '../jerk-guoyi-suffix';

@Component({
    selector: 'jhi-footprint-guoyi-suffix-dialog',
    templateUrl: './footprint-guoyi-suffix-dialog.component.html'
})
export class FootprintGuoyiSuffixDialogComponent implements OnInit {

    footprint: FootprintGuoyiSuffix;
    isSaving: boolean;

    jerks: JerkGuoyiSuffix[];
    createdDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private footprintService: FootprintGuoyiSuffixService,
        private jerkService: JerkGuoyiSuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jerkService.query()
            .subscribe((res: HttpResponse<JerkGuoyiSuffix[]>) => { this.jerks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.footprint.id !== undefined) {
            this.subscribeToSaveResponse(
                this.footprintService.update(this.footprint));
        } else {
            this.subscribeToSaveResponse(
                this.footprintService.create(this.footprint));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FootprintGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<FootprintGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FootprintGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'footprintListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJerkById(index: number, item: JerkGuoyiSuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-footprint-guoyi-suffix-popup',
    template: ''
})
export class FootprintGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private footprintPopupService: FootprintGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.footprintPopupService
                    .open(FootprintGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.footprintPopupService
                    .open(FootprintGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
