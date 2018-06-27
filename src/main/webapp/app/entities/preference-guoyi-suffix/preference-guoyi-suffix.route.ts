import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PreferenceGuoyiSuffixComponent } from './preference-guoyi-suffix.component';
import { PreferenceGuoyiSuffixDetailComponent } from './preference-guoyi-suffix-detail.component';
import { PreferenceGuoyiSuffixPopupComponent } from './preference-guoyi-suffix-dialog.component';
import { PreferenceGuoyiSuffixDeletePopupComponent } from './preference-guoyi-suffix-delete-dialog.component';

export const preferenceRoute: Routes = [
    {
        path: 'preference-guoyi-suffix',
        component: PreferenceGuoyiSuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'preference-guoyi-suffix/:id',
        component: PreferenceGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preferencePopupRoute: Routes = [
    {
        path: 'preference-guoyi-suffix-new',
        component: PreferenceGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'preference-guoyi-suffix/:id/edit',
        component: PreferenceGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'preference-guoyi-suffix/:id/delete',
        component: PreferenceGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
