import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MessageTextGuoyiSuffixComponent } from './message-text-guoyi-suffix.component';
import { MessageTextGuoyiSuffixDetailComponent } from './message-text-guoyi-suffix-detail.component';
import { MessageTextGuoyiSuffixPopupComponent,MessageTextGuoyiSuffixDialogComponent } from './message-text-guoyi-suffix-dialog.component';
import { MessageTextGuoyiSuffixDeletePopupComponent } from './message-text-guoyi-suffix-delete-dialog.component';

@Injectable()
export class MessageTextGuoyiSuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const messageTextRoute: Routes = [
    {
        path: 'message-text-guoyi-suffix',
        component: MessageTextGuoyiSuffixComponent,
        resolve: {
            'pagingParams': MessageTextGuoyiSuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.messageText.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'message-text-guoyi-suffix/:id',
        component: MessageTextGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.messageText.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-text-guoyi-suffix/:id/edit',
        component: MessageTextGuoyiSuffixDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.messageText.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-text-guoyi-suffix-new',
        component: MessageTextGuoyiSuffixDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.messageText.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messageTextPopupRoute: Routes = [
    {
        path: 'message-text-guoyi-suffix-new',
        component: MessageTextGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.messageText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-text-guoyi-suffix/:id/edit',
        component: MessageTextGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.messageText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-text-guoyi-suffix/:id/delete',
        component: MessageTextGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.messageText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
