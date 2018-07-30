import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageGuoyiSuffix } from './message-guoyi-suffix.model';
import { MessageGuoyiSuffixPopupService } from './message-guoyi-suffix-popup.service';
import { MessageGuoyiSuffixService } from './message-guoyi-suffix.service';

@Component({
    selector: 'jhi-message-guoyi-suffix-delete-dialog',
    templateUrl: './message-guoyi-suffix-delete-dialog.component.html'
})
export class MessageGuoyiSuffixDeleteDialogComponent {

    message: MessageGuoyiSuffix;

    constructor(
        private messageService: MessageGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.messageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'messageListModification',
                content: 'Deleted an message'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-message-guoyi-suffix-delete-popup',
    template: ''
})
export class MessageGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messagePopupService: MessageGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.messagePopupService
                .open(MessageGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
