import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MailboxGuoyiSuffix } from './mailbox-guoyi-suffix.model';
import { MailboxGuoyiSuffixService } from './mailbox-guoyi-suffix.service';

@Component({
    selector: 'jhi-mailbox-guoyi-suffix-detail',
    templateUrl: './mailbox-guoyi-suffix-detail.component.html'
})
export class MailboxGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    mailbox: MailboxGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mailboxService: MailboxGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMailboxes();
    }

    load(id) {
        this.mailboxService.find(id)
            .subscribe((mailboxResponse: HttpResponse<MailboxGuoyiSuffix>) => {
                this.mailbox = mailboxResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMailboxes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mailboxListModification',
            (response) => this.load(this.mailbox.id)
        );
    }
}
