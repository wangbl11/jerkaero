import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RegistrationGuoyiSuffix } from './registration-guoyi-suffix.model';
import { RegistrationGuoyiSuffixService } from './registration-guoyi-suffix.service';

@Injectable()
export class RegistrationGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private registrationService: RegistrationGuoyiSuffixService

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
                this.registrationService.find(id)
                    .subscribe((registrationResponse: HttpResponse<RegistrationGuoyiSuffix>) => {
                        const registration: RegistrationGuoyiSuffix = registrationResponse.body;
                        if (registration.createdDate) {
                            registration.createdDate = {
                                year: registration.createdDate.getFullYear(),
                                month: registration.createdDate.getMonth() + 1,
                                day: registration.createdDate.getDate()
                            };
                        }
                        if (registration.modifiedDate) {
                            registration.modifiedDate = {
                                year: registration.modifiedDate.getFullYear(),
                                month: registration.modifiedDate.getMonth() + 1,
                                day: registration.modifiedDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.registrationModalRef(component, registration);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.registrationModalRef(component, new RegistrationGuoyiSuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    registrationModalRef(component: Component, registration: RegistrationGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.registration = registration;
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
