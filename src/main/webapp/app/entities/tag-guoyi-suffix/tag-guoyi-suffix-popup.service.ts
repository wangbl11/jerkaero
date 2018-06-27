import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TagGuoyiSuffix } from './tag-guoyi-suffix.model';
import { TagGuoyiSuffixService } from './tag-guoyi-suffix.service';

@Injectable()
export class TagGuoyiSuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tagService: TagGuoyiSuffixService

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
                this.tagService.find(id)
                    .subscribe((tagResponse: HttpResponse<TagGuoyiSuffix>) => {
                        const tag: TagGuoyiSuffix = tagResponse.body;
                        // if (tag.createdDate) {
                        //     tag.createdDate = {
                        //         year: tag.createdDate.getFullYear(),
                        //         month: tag.createdDate.getMonth() + 1,
                        //         day: tag.createdDate.getDate()
                        //     };
                        // }
                        // if (tag.modifiedDate) {
                        //     tag.modifiedDate = {
                        //         year: tag.modifiedDate.getFullYear(),
                        //         month: tag.modifiedDate.getMonth() + 1,
                        //         day: tag.modifiedDate.getDate()
                        //     };
                        // }
                        this.ngbModalRef = this.tagModalRef(component, tag);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tagModalRef(component, new TagGuoyiSuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tagModalRef(component: Component, tag: TagGuoyiSuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tag = tag;
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
