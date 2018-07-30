import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    MessageGuoyiSuffixService,
    MessageGuoyiSuffixPopupService,
    MessageGuoyiSuffixComponent,
    MessageGuoyiSuffixDetailComponent,
    MessageGuoyiSuffixDialogComponent,
    MessageGuoyiSuffixPopupComponent,
    MessageGuoyiSuffixDeletePopupComponent,
    MessageGuoyiSuffixDeleteDialogComponent,
    messageRoute,
    messagePopupRoute,
    MessageGuoyiSuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...messageRoute,
    ...messagePopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MessageGuoyiSuffixComponent,
        MessageGuoyiSuffixDetailComponent,
        MessageGuoyiSuffixDialogComponent,
        MessageGuoyiSuffixDeleteDialogComponent,
        MessageGuoyiSuffixPopupComponent,
        MessageGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        MessageGuoyiSuffixComponent,
        MessageGuoyiSuffixDialogComponent,
        MessageGuoyiSuffixPopupComponent,
        MessageGuoyiSuffixDeleteDialogComponent,
        MessageGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        MessageGuoyiSuffixService,
        MessageGuoyiSuffixPopupService,
        MessageGuoyiSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroMessageGuoyiSuffixModule {}
