import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MailboxGuoyiSuffix } from './mailbox-guoyi-suffix.model';
import { MailboxGuoyiSuffixService } from './mailbox-guoyi-suffix.service';

@Injectable()
export class MailboxGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private mailboxService: MailboxGuoyiSuffixService

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
                this.mailboxService.find(id)
                    .subscribe((mailboxResponse: HttpResponse<MailboxGuoyiSuffix>) => {
                        const mailbox: MailboxGuoyiSuffix = mailboxResponse.body;
                        // if (mailbox.createdDate) {
                        //     mailbox.createdDate = {
                        //         year: mailbox.createdDate.getFullYear(),
                        //         month: mailbox.createdDate.getMonth() + 1,
                        //         day: mailbox.createdDate.getDate()
                        //     };
                        // }
                        // if (mailbox.readDate) {
                        //     mailbox.readDate = {
                        //         year: mailbox.readDate.getFullYear(),
                        //         month: mailbox.readDate.getMonth() + 1,
                        //         day: mailbox.readDate.getDate()
                        //     };
                        // }
                        this.ngbModalRef = this.mailboxModalRef(component, mailbox);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    let _mail=new MailboxGuoyiSuffix();
                    _mail.sendId=-1;
                    _mail.msgType=0;
                    _mail.receiverId=-1;
                    _mail.anonymous=1;
                    this.ngbModalRef = this.mailboxModalRef(component, _mail);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mailboxModalRef(component: Component, mailbox: MailboxGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mailbox = mailbox;
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
