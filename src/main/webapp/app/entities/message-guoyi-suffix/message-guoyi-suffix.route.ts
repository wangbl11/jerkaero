import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MessageGuoyiSuffixComponent } from './message-guoyi-suffix.component';
import { MessageGuoyiSuffixDetailComponent } from './message-guoyi-suffix-detail.component';
import { MessageGuoyiSuffixPopupComponent } from './message-guoyi-suffix-dialog.component';
import { MessageGuoyiSuffixDeletePopupComponent } from './message-guoyi-suffix-delete-dialog.component';

@Injectable()
export class MessageGuoyiSuffixResolvePagingParams implements Resolve<any> {

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

export const messageRoute: Routes = [
    {
        path: 'message-guoyi-suffix',
        component: MessageGuoyiSuffixComponent,
        resolve: {
            'pagingParams': MessageGuoyiSuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'message-guoyi-suffix/:id',
        component: MessageGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messagePopupRoute: Routes = [
    {
        path: 'message-guoyi-suffix-new',
        component: MessageGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-guoyi-suffix/:id/edit',
        component: MessageGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-guoyi-suffix/:id/delete',
        component: MessageGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
