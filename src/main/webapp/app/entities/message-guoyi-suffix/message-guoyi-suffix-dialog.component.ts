import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageGuoyiSuffix } from './message-guoyi-suffix.model';
import { MessageGuoyiSuffixPopupService } from './message-guoyi-suffix-popup.service';
import { MessageGuoyiSuffixService } from './message-guoyi-suffix.service';

@Component({
    selector: 'jhi-message-guoyi-suffix-dialog',
    templateUrl: './message-guoyi-suffix-dialog.component.html'
})
export class MessageGuoyiSuffixDialogComponent implements OnInit {

    message: MessageGuoyiSuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private messageService: MessageGuoyiSuffixService,
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
        if (this.message.id !== undefined) {
            this.subscribeToSaveResponse(
                this.messageService.update(this.message));
        } else {
            this.subscribeToSaveResponse(
                this.messageService.create(this.message));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MessageGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<MessageGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MessageGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'messageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-message-guoyi-suffix-popup',
    template: ''
})
export class MessageGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messagePopupService: MessageGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.messagePopupService
                    .open(MessageGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.messagePopupService
                    .open(MessageGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
