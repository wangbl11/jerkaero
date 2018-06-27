import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GlobalSettingGuoyiSuffix } from './global-setting-guoyi-suffix.model';
import { GlobalSettingGuoyiSuffixService } from './global-setting-guoyi-suffix.service';

@Injectable()
export class GlobalSettingGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private globalSettingService: GlobalSettingGuoyiSuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.globalSettingService.find(id)
                    .subscribe((globalSettingResponse: HttpResponse<GlobalSettingGuoyiSuffix>) => {
                        const globalSetting: GlobalSettingGuoyiSuffix = globalSettingResponse.body;
                        globalSetting.createdDate = this.datePipe
                            .transform(globalSetting.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        globalSetting.modifiedDate = this.datePipe
                            .transform(globalSetting.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.globalSettingModalRef(component, globalSetting);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.globalSettingModalRef(component, new GlobalSettingGuoyiSuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    globalSettingModalRef(component: Component, globalSetting: GlobalSettingGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.globalSetting = globalSetting;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
