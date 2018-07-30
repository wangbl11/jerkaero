import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MessageGuoyiSuffix } from './message-guoyi-suffix.model';
import { MessageGuoyiSuffixService } from './message-guoyi-suffix.service';

@Component({
    selector: 'jhi-message-guoyi-suffix-detail',
    templateUrl: './message-guoyi-suffix-detail.component.html'
})
export class MessageGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    message: MessageGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMessages();
    }

    load(id) {
        this.messageService.find(id)
            .subscribe((messageResponse: HttpResponse<MessageGuoyiSuffix>) => {
                this.message = messageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'messageListModification',
            (response) => this.load(this.message.id)
        );
    }
}
