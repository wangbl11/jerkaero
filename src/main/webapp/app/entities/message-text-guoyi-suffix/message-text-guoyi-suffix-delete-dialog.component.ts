import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageTextGuoyiSuffix } from './message-text-guoyi-suffix.model';
import { MessageTextGuoyiSuffixPopupService } from './message-text-guoyi-suffix-popup.service';
import { MessageTextGuoyiSuffixService } from './message-text-guoyi-suffix.service';

@Component({
    selector: 'jhi-message-text-guoyi-suffix-delete-dialog',
    templateUrl: './message-text-guoyi-suffix-delete-dialog.component.html'
})
export class MessageTextGuoyiSuffixDeleteDialogComponent {

    messageText: MessageTextGuoyiSuffix;

    constructor(
        private messageTextService: MessageTextGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.messageTextService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'messageTextListModification',
                content: 'Deleted an messageText'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-message-text-guoyi-suffix-delete-popup',
    template: ''
})
export class MessageTextGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messageTextPopupService: MessageTextGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.messageTextPopupService
                .open(MessageTextGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
