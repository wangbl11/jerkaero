import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JerkGuoyiSuffix } from './jerk-guoyi-suffix.model';
import { JerkGuoyiSuffixService } from './jerk-guoyi-suffix.service';

@Injectable()
export class JerkGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jerkService: JerkGuoyiSuffixService

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
                this.jerkService.find(id)
                    .subscribe((jerkResponse: HttpResponse<JerkGuoyiSuffix>) => {
                        const jerk: JerkGuoyiSuffix = jerkResponse.body;
                        // if (jerk.createdDate) {
                        //     jerk.createdDate = {
                        //         year: jerk.createdDate.getFullYear(),
                        //         month: jerk.createdDate.getMonth() + 1,
                        //         day: jerk.createdDate.getDate()
                        //     };
                        // }
                        // if (jerk.modifiedDate) {
                        //     jerk.modifiedDate = {
                        //         year: jerk.modifiedDate.getFullYear(),
                        //         month: jerk.modifiedDate.getMonth() + 1,
                        //         day: jerk.modifiedDate.getDate()
                        //     };
                        // }
                        this.ngbModalRef = this.jerkModalRef(component, jerk);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jerkModalRef(component, new JerkGuoyiSuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jerkModalRef(component: Component, jerk: JerkGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jerk = jerk;
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
