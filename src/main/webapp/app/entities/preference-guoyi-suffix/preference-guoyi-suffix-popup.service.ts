import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PreferenceGuoyiSuffix } from './preference-guoyi-suffix.model';
import { PreferenceGuoyiSuffixService } from './preference-guoyi-suffix.service';

@Injectable()
export class PreferenceGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private preferenceService: PreferenceGuoyiSuffixService

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
                this.preferenceService.find(id)
                    .subscribe((preferenceResponse: HttpResponse<PreferenceGuoyiSuffix>) => {
                        const preference: PreferenceGuoyiSuffix = preferenceResponse.body;
                        if (preference.createdDate) {
                            preference.createdDate = {
                                year: preference.createdDate.getFullYear(),
                                month: preference.createdDate.getMonth() + 1,
                                day: preference.createdDate.getDate()
                            };
                        }
                        if (preference.modifiedDate) {
                            preference.modifiedDate = {
                                year: preference.modifiedDate.getFullYear(),
                                month: preference.modifiedDate.getMonth() + 1,
                                day: preference.modifiedDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.preferenceModalRef(component, preference);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.preferenceModalRef(component, new PreferenceGuoyiSuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    preferenceModalRef(component: Component, preference: PreferenceGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.preference = preference;
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
