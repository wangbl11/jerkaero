import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MessageTextGuoyiSuffix } from './message-text-guoyi-suffix.model';
import { MessageTextGuoyiSuffixService } from './message-text-guoyi-suffix.service';

@Component({
    selector: 'jhi-message-text-guoyi-suffix-detail',
    templateUrl: './message-text-guoyi-suffix-detail.component.html'
})
export class MessageTextGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    messageText: MessageTextGuoyiSuffix;
    private recIDs: string;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    
    constructor(
        private eventManager: JhiEventManager,
        private messageTextService: MessageTextGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMessageTexts();
    }

    load(id) {
        this.messageTextService.find(id)
            .subscribe((messageTextResponse: HttpResponse<MessageTextGuoyiSuffix>) => {
                this.messageText = messageTextResponse.body;
                this.recIDs="";
                if (this.messageText.receivers!=null)
                  for (var i=0;i<this.messageText.receivers.length;i++){
                      this.recIDs+=(i>0?", ":"")+this.messageText.receivers[i]['recName']; 
                  }
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMessageTexts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'messageTextListModification',
            (response) => this.load(this.messageText.id)
        );
    }
}
