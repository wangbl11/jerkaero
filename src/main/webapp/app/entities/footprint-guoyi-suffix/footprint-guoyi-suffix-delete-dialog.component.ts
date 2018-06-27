import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FootprintGuoyiSuffix } from './footprint-guoyi-suffix.model';
import { FootprintGuoyiSuffixPopupService } from './footprint-guoyi-suffix-popup.service';
import { FootprintGuoyiSuffixService } from './footprint-guoyi-suffix.service';

@Component({
    selector: 'jhi-footprint-guoyi-suffix-delete-dialog',
    templateUrl: './footprint-guoyi-suffix-delete-dialog.component.html'
})
export class FootprintGuoyiSuffixDeleteDialogComponent {

    footprint: FootprintGuoyiSuffix;

    constructor(
        private footprintService: FootprintGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.footprintService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'footprintListModification',
                content: 'Deleted an footprint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-footprint-guoyi-suffix-delete-popup',
    template: ''
})
export class FootprintGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private footprintPopupService: FootprintGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.footprintPopupService
                .open(FootprintGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
