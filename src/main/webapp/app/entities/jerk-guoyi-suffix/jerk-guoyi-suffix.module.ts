import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
//import { RegistrationGuoyiSuffixDetailComponent } from '../registration-guoyi-suffix-detail.component';
import {
    JerkGuoyiSuffixService,
    JerkGuoyiSuffixPopupService,
    JerkGuoyiSuffixComponent,
    JerkGuoyiSuffixDetailComponent,
    JerkGuoyiSuffixDialogComponent,
    JerkGuoyiSuffixDeletePopupComponent,
    JerkGuoyiSuffixDeleteDialogComponent,
    jerkRoute,
    jerkPopupRoute,
    JerkGuoyiSuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...jerkRoute,
    ...jerkPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JerkGuoyiSuffixComponent,
        JerkGuoyiSuffixDetailComponent,
        JerkGuoyiSuffixDialogComponent,
        JerkGuoyiSuffixDeleteDialogComponent,
        JerkGuoyiSuffixDeletePopupComponent
    ],
    entryComponents: [
        JerkGuoyiSuffixComponent,
        JerkGuoyiSuffixDialogComponent,
        JerkGuoyiSuffixDeleteDialogComponent,
        JerkGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        JerkGuoyiSuffixService,
        JerkGuoyiSuffixPopupService,
        JerkGuoyiSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroJerkGuoyiSuffixModule {}
