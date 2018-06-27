import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TagGuoyiSuffix } from './tag-guoyi-suffix.model';
import { TagGuoyiSuffixPopupService } from './tag-guoyi-suffix-popup.service';
import { TagGuoyiSuffixService } from './tag-guoyi-suffix.service';

@Component({
    selector: 'jhi-tag-guoyi-suffix-delete-dialog',
    templateUrl: './tag-guoyi-suffix-delete-dialog.component.html'
})
export class TagGuoyiSuffixDeleteDialogComponent {

    tag: TagGuoyiSuffix;

    constructor(
        private tagService: TagGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tagListModification',
                content: 'Deleted an tag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tag-guoyi-suffix-delete-popup',
    template: ''
})
export class TagGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagPopupService: TagGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tagPopupService
                .open(TagGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
