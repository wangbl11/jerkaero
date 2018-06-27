import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MailboxGuoyiSuffix } from './mailbox-guoyi-suffix.model';
import { MailboxGuoyiSuffixPopupService } from './mailbox-guoyi-suffix-popup.service';
import { MailboxGuoyiSuffixService } from './mailbox-guoyi-suffix.service';
import { JerkGuoyiSuffix, JerkGuoyiSuffixService } from '../jerk-guoyi-suffix';

@Component({
    selector: 'jhi-mailbox-guoyi-suffix-dialog',
    templateUrl: './mailbox-guoyi-suffix-dialog.component.html'
})
export class MailboxGuoyiSuffixDialogComponent implements OnInit {

    mailbox: MailboxGuoyiSuffix;
    isSaving: boolean;

    jerks: JerkGuoyiSuffix[];
    createdDateDp: any;
    readDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mailboxService: MailboxGuoyiSuffixService,
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
        if (this.mailbox.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mailboxService.update(this.mailbox));
        } else {
            this.subscribeToSaveResponse(
                this.mailboxService.create(this.mailbox));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MailboxGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<MailboxGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MailboxGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'mailboxListModification', content: 'OK'});
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
    selector: 'jhi-mailbox-guoyi-suffix-popup',
    template: ''
})
export class MailboxGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mailboxPopupService: MailboxGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mailboxPopupService
                    .open(MailboxGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.mailboxPopupService
                    .open(MailboxGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
