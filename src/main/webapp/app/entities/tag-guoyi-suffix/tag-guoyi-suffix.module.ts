import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    TagGuoyiSuffixService,
    TagGuoyiSuffixPopupService,
    TagGuoyiSuffixComponent,
    TagGuoyiSuffixDetailComponent,
    TagGuoyiSuffixDialogComponent,
    TagGuoyiSuffixPopupComponent,
    TagGuoyiSuffixDeletePopupComponent,
    TagGuoyiSuffixDeleteDialogComponent,
    tagRoute,
    tagPopupRoute,
    TagGuoyiSuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tagRoute,
    ...tagPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagGuoyiSuffixComponent,
        TagGuoyiSuffixDetailComponent,
        TagGuoyiSuffixDialogComponent,
        TagGuoyiSuffixDeleteDialogComponent,
        TagGuoyiSuffixPopupComponent,
        TagGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        TagGuoyiSuffixComponent,
        TagGuoyiSuffixDialogComponent,
        TagGuoyiSuffixPopupComponent,
        TagGuoyiSuffixDeleteDialogComponent,
        TagGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        TagGuoyiSuffixService,
        TagGuoyiSuffixPopupService,
        TagGuoyiSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroTagGuoyiSuffixModule {}
