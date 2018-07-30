import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MessageTextGuoyiSuffix } from './message-text-guoyi-suffix.model';
import { MessageTextGuoyiSuffixPopupService } from './message-text-guoyi-suffix-popup.service';
import { MessageTextGuoyiSuffixService } from './message-text-guoyi-suffix.service';
import { JerkGuoyiSuffix, JerkGuoyiSuffixService } from '../jerk-guoyi-suffix';
import { MessageGuoyiSuffix } from '../message-guoyi-suffix';

@Component({
    selector: 'jhi-message-text-guoyi-suffix-dialog',
    templateUrl: './message-text-guoyi-suffix-dialog.component.html'
})
export class MessageTextGuoyiSuffixDialogComponent implements OnInit {

    messageTexts: MessageTextGuoyiSuffix[];
    jerks: JerkGuoyiSuffix[];
    currentSearch: string;
    messageText: MessageTextGuoyiSuffix;
    private subscription: any;
    isSaving: boolean;
    links: any;
    itemsPerPage: number;
    page:any;
    totalItems: any;
    recIDs: MessageGuoyiSuffix[];
    recNames:string;
    constructor(
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private messageTextService: MessageTextGuoyiSuffixService,
        private jerkService: JerkGuoyiSuffixService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.links = {
            last: 0
        };
        this.recIDs=[];
        this.recNames="";
        this.subscription = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
               this.messageTextService.find(params['id'])
                    .subscribe((messageTextResponse: HttpResponse<MessageTextGuoyiSuffix>) => {
                        this.messageText = messageTextResponse.body;
                        this.recIDs=this.messageText.receivers;
                        this.recNames="";
                        for (var i=0;i<this.recIDs.length;i++){
                            this.recNames+=(i>0?", ":"")+this.recIDs[i]['recName']; 
                        }
               });
            } else {
               this.messageText = new MessageTextGuoyiSuffix();
               this.messageText.sendID=-1;
               this.messageText.msgStatus=1;
               this.messageText.receivers=[];
               this.recIDs=this.messageText.receivers;
            }
        });
    }

    loadAll() {
        if (this.currentSearch) {
            this.jerkService.search({
                query: this.currentSearch,
                page: this.page,
                size: this.itemsPerPage
            }).subscribe(
                (res: HttpResponse<JerkGuoyiSuffix[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }
        this.jerkService.querySimple({
            page: this.page,
            size: this.itemsPerPage
        }).subscribe(
            (res: HttpResponse<JerkGuoyiSuffix[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    clearSearch() {
        this.page = 0;
        this.currentSearch = '';
        /*
        this.router.navigate(['/message-text-guoyi-suffix', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        */
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clearSearch();
        }
        this.page = 0;
        this.currentSearch = query;
        /*
        this.router.navigate(['/message-text-guoyi-suffix', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        */
        this.loadAll();
    }
    clear() {
        //this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.messageText.id !== undefined) {
            this.subscribeToSaveResponse(
                this.messageTextService.update(this.messageText));
        } else {
            this.subscribeToSaveResponse(
                this.messageTextService.create(this.messageText));
        }
        
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MessageTextGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<MessageTextGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MessageTextGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'messageTextListModification', content: 'OK'});
        this.isSaving = false;
       // this.activeModal.dismiss(result);
       this.router.navigate(['/message-text-guoyi-suffix']);
    }

    private onSaveError() {
        this.isSaving = false;
    }
    
    private onSuccess(data, headers) {
        //this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        //this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.jerks = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    
    private doubleClick(e,f) {
        //  if (this.recIDs.indexOf(e)<0)
        //    this.recIDs.push(e);
        let newone=new MessageGuoyiSuffix();
        newone.recID=e;
        newone.sendID=-1;
        newone.statue=0;
        this.recIDs.push(newone);
         if (this.recNames.length==0)
             this.recNames=f;
         else
             this.recNames=this.recNames+","+f;
         console.log(this.recIDs);
    }
    previousState() {
        window.history.back();
    }
}

@Component({
    selector: 'jhi-message-text-guoyi-suffix-popup',
    template: ''
})
export class MessageTextGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messageTextPopupService: MessageTextGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.messageTextPopupService
                    .open(MessageTextGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.messageTextPopupService
                    .open(MessageTextGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
