import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MailboxGuoyiSuffix } from './mailbox-guoyi-suffix.model';
import { MailboxGuoyiSuffixPopupService } from './mailbox-guoyi-suffix-popup.service';
import { MailboxGuoyiSuffixService } from './mailbox-guoyi-suffix.service';

@Component({
    selector: 'jhi-mailbox-guoyi-suffix-delete-dialog',
    templateUrl: './mailbox-guoyi-suffix-delete-dialog.component.html'
})
export class MailboxGuoyiSuffixDeleteDialogComponent {

    mailbox: MailboxGuoyiSuffix;

    constructor(
        private mailboxService: MailboxGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mailboxService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mailboxListModification',
                content: 'Deleted an mailbox'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mailbox-guoyi-suffix-delete-popup',
    template: ''
})
export class MailboxGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mailboxPopupService: MailboxGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mailboxPopupService
                .open(MailboxGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
