import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PreferenceGuoyiSuffix } from './preference-guoyi-suffix.model';
import { PreferenceGuoyiSuffixPopupService } from './preference-guoyi-suffix-popup.service';
import { PreferenceGuoyiSuffixService } from './preference-guoyi-suffix.service';

@Component({
    selector: 'jhi-preference-guoyi-suffix-delete-dialog',
    templateUrl: './preference-guoyi-suffix-delete-dialog.component.html'
})
export class PreferenceGuoyiSuffixDeleteDialogComponent {

    preference: PreferenceGuoyiSuffix;

    constructor(
        private preferenceService: PreferenceGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.preferenceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'preferenceListModification',
                content: 'Deleted an preference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-preference-guoyi-suffix-delete-popup',
    template: ''
})
export class PreferenceGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preferencePopupService: PreferenceGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.preferencePopupService
                .open(PreferenceGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
