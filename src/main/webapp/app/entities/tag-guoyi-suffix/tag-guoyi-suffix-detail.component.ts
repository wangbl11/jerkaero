import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TagGuoyiSuffix } from './tag-guoyi-suffix.model';
import { TagGuoyiSuffixService } from './tag-guoyi-suffix.service';

@Component({
    selector: 'jhi-tag-guoyi-suffix-detail',
    templateUrl: './tag-guoyi-suffix-detail.component.html'
})
export class TagGuoyiSuffixDetailComponent implements OnInit, OnDestroy {

    tag: TagGuoyiSuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tagService: TagGuoyiSuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTags();
    }

    load(id) {
        this.tagService.find(id)
            .subscribe((tagResponse: HttpResponse<TagGuoyiSuffix>) => {
                this.tag = tagResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tagListModification',
            (response) => this.load(this.tag.id)
        );
    }
}
