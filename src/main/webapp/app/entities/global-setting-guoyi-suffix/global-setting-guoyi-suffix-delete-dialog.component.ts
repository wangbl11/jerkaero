import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GlobalSettingGuoyiSuffix } from './global-setting-guoyi-suffix.model';
import { GlobalSettingGuoyiSuffixPopupService } from './global-setting-guoyi-suffix-popup.service';
import { GlobalSettingGuoyiSuffixService } from './global-setting-guoyi-suffix.service';

@Component({
    selector: 'jhi-global-setting-guoyi-suffix-delete-dialog',
    templateUrl: './global-setting-guoyi-suffix-delete-dialog.component.html'
})
export class GlobalSettingGuoyiSuffixDeleteDialogComponent {

    globalSetting: GlobalSettingGuoyiSuffix;

    constructor(
        private globalSettingService: GlobalSettingGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.globalSettingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'globalSettingListModification',
                content: 'Deleted an globalSetting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-global-setting-guoyi-suffix-delete-popup',
    template: ''
})
export class GlobalSettingGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private globalSettingPopupService: GlobalSettingGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.globalSettingPopupService
                .open(GlobalSettingGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
