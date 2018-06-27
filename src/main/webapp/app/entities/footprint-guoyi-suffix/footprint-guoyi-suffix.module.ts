import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    FootprintGuoyiSuffixService,
    FootprintGuoyiSuffixPopupService,
    FootprintGuoyiSuffixComponent,
    FootprintGuoyiSuffixDetailComponent,
    FootprintGuoyiSuffixDialogComponent,
    FootprintGuoyiSuffixPopupComponent,
    FootprintGuoyiSuffixDeletePopupComponent,
    FootprintGuoyiSuffixDeleteDialogComponent,
    footprintRoute,
    footprintPopupRoute,
} from './';

const ENTITY_STATES = [
    ...footprintRoute,
    ...footprintPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FootprintGuoyiSuffixComponent,
        FootprintGuoyiSuffixDetailComponent,
        FootprintGuoyiSuffixDialogComponent,
        FootprintGuoyiSuffixDeleteDialogComponent,
        FootprintGuoyiSuffixPopupComponent,
        FootprintGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        FootprintGuoyiSuffixComponent,
        FootprintGuoyiSuffixDialogComponent,
        FootprintGuoyiSuffixPopupComponent,
        FootprintGuoyiSuffixDeleteDialogComponent,
        FootprintGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        FootprintGuoyiSuffixService,
        FootprintGuoyiSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroFootprintGuoyiSuffixModule {}
