import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GlobalSettingGuoyiSuffixComponent } from './global-setting-guoyi-suffix.component';
import { GlobalSettingGuoyiSuffixDetailComponent } from './global-setting-guoyi-suffix-detail.component';
import { GlobalSettingGuoyiSuffixPopupComponent } from './global-setting-guoyi-suffix-dialog.component';
import { GlobalSettingGuoyiSuffixDeletePopupComponent } from './global-setting-guoyi-suffix-delete-dialog.component';

export const globalSettingRoute: Routes = [
    {
        path: 'global-setting-guoyi-suffix',
        component: GlobalSettingGuoyiSuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'global-setting-guoyi-suffix/:id',
        component: GlobalSettingGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const globalSettingPopupRoute: Routes = [
    {
        path: 'global-setting-guoyi-suffix-new',
        component: GlobalSettingGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'global-setting-guoyi-suffix/:id/edit',
        component: GlobalSettingGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'global-setting-guoyi-suffix/:id/delete',
        component: GlobalSettingGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
