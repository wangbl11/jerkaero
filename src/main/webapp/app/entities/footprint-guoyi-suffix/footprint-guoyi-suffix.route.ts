import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FootprintGuoyiSuffixComponent } from './footprint-guoyi-suffix.component';
import { FootprintGuoyiSuffixDetailComponent } from './footprint-guoyi-suffix-detail.component';
import { FootprintGuoyiSuffixPopupComponent } from './footprint-guoyi-suffix-dialog.component';
import { FootprintGuoyiSuffixDeletePopupComponent } from './footprint-guoyi-suffix-delete-dialog.component';

export const footprintRoute: Routes = [
    {
        path: 'footprint-guoyi-suffix',
        component: FootprintGuoyiSuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.footprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'footprint-guoyi-suffix/:id',
        component: FootprintGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.footprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const footprintPopupRoute: Routes = [
    {
        path: 'footprint-guoyi-suffix-new',
        component: FootprintGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.footprint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'footprint-guoyi-suffix/:id/edit',
        component: FootprintGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.footprint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'footprint-guoyi-suffix/:id/delete',
        component: FootprintGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.footprint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
