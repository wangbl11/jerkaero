import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegistrationGuoyiSuffix } from './registration-guoyi-suffix.model';
import { RegistrationGuoyiSuffixPopupService } from './registration-guoyi-suffix-popup.service';
import { RegistrationGuoyiSuffixService } from './registration-guoyi-suffix.service';

@Component({
    selector: 'jhi-registration-guoyi-suffix-delete-dialog',
    templateUrl: './registration-guoyi-suffix-delete-dialog.component.html'
})
export class RegistrationGuoyiSuffixDeleteDialogComponent {

    registration: RegistrationGuoyiSuffix;

    constructor(
        private registrationService: RegistrationGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registrationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'registrationListModification',
                content: 'Deleted an registration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registration-guoyi-suffix-delete-popup',
    template: ''
})
export class RegistrationGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationPopupService: RegistrationGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.registrationPopupService
                .open(RegistrationGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
