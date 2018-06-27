import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JerkGuoyiSuffix } from './jerk-guoyi-suffix.model';
import { JerkGuoyiSuffixPopupService } from './jerk-guoyi-suffix-popup.service';
import { JerkGuoyiSuffixService } from './jerk-guoyi-suffix.service';

@Component({
    selector: 'jhi-jerk-guoyi-suffix-delete-dialog',
    templateUrl: './jerk-guoyi-suffix-delete-dialog.component.html'
})
export class JerkGuoyiSuffixDeleteDialogComponent {

    jerk: JerkGuoyiSuffix;

    constructor(
        private jerkService: JerkGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jerkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jerkListModification',
                content: 'Deleted an jerk'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jerk-guoyi-suffix-delete-popup',
    template: ''
})
export class JerkGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jerkPopupService: JerkGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jerkPopupService
                .open(JerkGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
