import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MailboxGuoyiSuffixComponent } from './mailbox-guoyi-suffix.component';
import { MailboxGuoyiSuffixDetailComponent } from './mailbox-guoyi-suffix-detail.component';
import { MailboxGuoyiSuffixPopupComponent } from './mailbox-guoyi-suffix-dialog.component';
import { MailboxGuoyiSuffixDeletePopupComponent } from './mailbox-guoyi-suffix-delete-dialog.component';

@Injectable()
export class MailboxGuoyiSuffixResolvePagingParams implements Resolve<any> {

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

export const mailboxRoute: Routes = [
    {
        path: 'mailbox-guoyi-suffix',
        component: MailboxGuoyiSuffixComponent,
        resolve: {
            'pagingParams': MailboxGuoyiSuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.mailbox.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mailbox-guoyi-suffix/:id',
        component: MailboxGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.mailbox.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mailboxPopupRoute: Routes = [
    {
        path: 'mailbox-guoyi-suffix-new',
        component: MailboxGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.mailbox.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mailbox-guoyi-suffix/:id/edit',
        component: MailboxGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.mailbox.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mailbox-guoyi-suffix/:id/delete',
        component: MailboxGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.mailbox.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
