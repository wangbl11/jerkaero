import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SettingGuoyiSuffix } from './setting-guoyi-suffix.model';
import { SettingGuoyiSuffixPopupService } from './setting-guoyi-suffix-popup.service';
import { SettingGuoyiSuffixService } from './setting-guoyi-suffix.service';

@Component({
    selector: 'jhi-setting-guoyi-suffix-delete-dialog',
    templateUrl: './setting-guoyi-suffix-delete-dialog.component.html'
})
export class SettingGuoyiSuffixDeleteDialogComponent {

    setting: SettingGuoyiSuffix;

    constructor(
        private settingService: SettingGuoyiSuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.settingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'settingListModification',
                content: 'Deleted an setting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-setting-guoyi-suffix-delete-popup',
    template: ''
})
export class SettingGuoyiSuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private settingPopupService: SettingGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.settingPopupService
                .open(SettingGuoyiSuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
