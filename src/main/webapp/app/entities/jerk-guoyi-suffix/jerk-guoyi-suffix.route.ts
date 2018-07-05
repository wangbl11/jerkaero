import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RegistrationGuoyiSuffixDetailComponent } from '../registration-guoyi-suffix/registration-guoyi-suffix-detail.component';
import { RegistrationGuoyiSuffixDialogComponent } from '../registration-guoyi-suffix/registration-guoyi-suffix-dialog.component';
import { JerkGuoyiSuffixComponent } from './jerk-guoyi-suffix.component';
import { JerkGuoyiSuffixDetailComponent } from './jerk-guoyi-suffix-detail.component';
import { JerkGuoyiSuffixDialogComponent } from './jerk-guoyi-suffix-dialog.component';
import { JerkGuoyiSuffixDeletePopupComponent } from './jerk-guoyi-suffix-delete-dialog.component';

@Injectable()
export class JerkGuoyiSuffixResolvePagingParams implements Resolve<any> {

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

export const jerkRoute: Routes = [
    {
        path: 'jerk-guoyi-suffix',
        component: JerkGuoyiSuffixComponent,
        resolve: {
            'pagingParams': JerkGuoyiSuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.jerk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jerk-guoyi-suffix/:id',
        component: JerkGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.jerk.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jerk-guoyi-suffix/:id/edit',
        component: JerkGuoyiSuffixDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.jerk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, 
    {
        path: 'registration-guoyi-suffix/:id',
        component: RegistrationGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registration-guoyi-suffix-new',
        component: RegistrationGuoyiSuffixDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registration-guoyi-suffix/:id/edit',
        component: RegistrationGuoyiSuffixDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jerkPopupRoute: Routes = [
    {
        path: 'jerk-guoyi-suffix-new',
        component: JerkGuoyiSuffixDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.jerk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jerk-guoyi-suffix/:id/delete',
        component: JerkGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.jerk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
