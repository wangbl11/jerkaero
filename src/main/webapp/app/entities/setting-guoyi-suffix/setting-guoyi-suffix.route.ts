import { Resolve,ActivatedRouteSnapshot, RouterStateSnapshot,Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from '../../shared';
import { SettingGuoyiSuffixComponent } from './setting-guoyi-suffix.component';
import { SettingGuoyiSuffixDetailComponent } from './setting-guoyi-suffix-detail.component';
import { SettingGuoyiSuffixPopupComponent } from './setting-guoyi-suffix-dialog.component';
import { SettingGuoyiSuffixDeletePopupComponent } from './setting-guoyi-suffix-delete-dialog.component';

@Injectable()
export class SettingGuoyiSuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const settingRoute: Routes = [
    {
        path: 'setting-guoyi-suffix',
        component: SettingGuoyiSuffixComponent,
        resolve: {
            'pagingParams': SettingGuoyiSuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'setting-guoyi-suffix/:id',
        component: SettingGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const settingPopupRoute: Routes = [
    {
        path: 'setting-guoyi-suffix-new',
        component: SettingGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'setting-guoyi-suffix/:id/edit',
        component: SettingGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'setting-guoyi-suffix/:id/delete',
        component: SettingGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.setting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
