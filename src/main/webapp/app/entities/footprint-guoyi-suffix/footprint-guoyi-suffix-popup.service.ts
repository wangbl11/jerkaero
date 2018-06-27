import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FootprintGuoyiSuffix } from './footprint-guoyi-suffix.model';
import { FootprintGuoyiSuffixService } from './footprint-guoyi-suffix.service';

@Injectable()
export class FootprintGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private footprintService: FootprintGuoyiSuffixService

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
                this.footprintService.find(id)
                    .subscribe((footprintResponse: HttpResponse<FootprintGuoyiSuffix>) => {
                        const footprint: FootprintGuoyiSuffix = footprintResponse.body;
                        if (footprint.createdDate) {
                            footprint.createdDate = {
                                year: footprint.createdDate.getFullYear(),
                                month: footprint.createdDate.getMonth() + 1,
                                day: footprint.createdDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.footprintModalRef(component, footprint);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.footprintModalRef(component, new FootprintGuoyiSuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    footprintModalRef(component: Component, footprint: FootprintGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.footprint = footprint;
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
