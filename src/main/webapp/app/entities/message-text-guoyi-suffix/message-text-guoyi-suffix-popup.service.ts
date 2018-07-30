import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MessageTextGuoyiSuffix } from './message-text-guoyi-suffix.model';
import { MessageTextGuoyiSuffixService } from './message-text-guoyi-suffix.service';

@Injectable()
export class MessageTextGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private messageTextService: MessageTextGuoyiSuffixService

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
                this.messageTextService.find(id)
                    .subscribe((messageTextResponse: HttpResponse<MessageTextGuoyiSuffix>) => {
                        const messageText: MessageTextGuoyiSuffix = messageTextResponse.body;
                        console.log(messageText);
                        // messageText.createdDate = this.datePipe
                        //     .transform(messageText.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.messageTextModalRef(component, messageText);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const messageText: MessageTextGuoyiSuffix = new MessageTextGuoyiSuffix();
                    messageText.sendID=-1;
                    messageText.msgStatus=1;
                    this.ngbModalRef = this.messageTextModalRef(component,messageText);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    messageTextModalRef(component: Component, messageText: MessageTextGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.messageText = messageText;
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
