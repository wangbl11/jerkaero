import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TagGuoyiSuffix } from './tag-guoyi-suffix.model';
import { TagGuoyiSuffixPopupService } from './tag-guoyi-suffix-popup.service';
import { TagGuoyiSuffixService } from './tag-guoyi-suffix.service';

@Component({
    selector: 'jhi-tag-guoyi-suffix-dialog',
    templateUrl: './tag-guoyi-suffix-dialog.component.html'
})
export class TagGuoyiSuffixDialogComponent implements OnInit {

    tag: TagGuoyiSuffix;
    isSaving: boolean;
    createdDateDp: any;
    modifiedDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private tagService: TagGuoyiSuffixService,
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
        if (this.tag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tagService.update(this.tag));
        } else {
            this.subscribeToSaveResponse(
                this.tagService.create(this.tag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TagGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<TagGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TagGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'tagListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tag-guoyi-suffix-popup',
    template: ''
})
export class TagGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagPopupService: TagGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tagPopupService
                    .open(TagGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.tagPopupService
                    .open(TagGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
