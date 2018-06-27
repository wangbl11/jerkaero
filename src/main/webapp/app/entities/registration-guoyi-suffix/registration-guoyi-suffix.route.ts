import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RegistrationGuoyiSuffixComponent } from './registration-guoyi-suffix.component';
import { RegistrationGuoyiSuffixDetailComponent } from './registration-guoyi-suffix-detail.component';
import { RegistrationGuoyiSuffixPopupComponent } from './registration-guoyi-suffix-dialog.component';
import { RegistrationGuoyiSuffixDeletePopupComponent } from './registration-guoyi-suffix-delete-dialog.component';

export const registrationRoute: Routes = [
    {
        path: 'registration-guoyi-suffix',
        component: RegistrationGuoyiSuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registration-guoyi-suffix/:id',
        component: RegistrationGuoyiSuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registrationPopupRoute: Routes = [
    {
        path: 'registration-guoyi-suffix-new',
        component: RegistrationGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration-guoyi-suffix/:id/edit',
        component: RegistrationGuoyiSuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration-guoyi-suffix/:id/delete',
        component: RegistrationGuoyiSuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jerkaeroApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
