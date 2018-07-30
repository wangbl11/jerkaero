import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    MessageTextGuoyiSuffixService,
    MessageTextGuoyiSuffixPopupService,
    MessageTextGuoyiSuffixComponent,
    MessageTextGuoyiSuffixDetailComponent,
    MessageTextGuoyiSuffixDialogComponent,
    MessageTextGuoyiSuffixPopupComponent,
    MessageTextGuoyiSuffixDeletePopupComponent,
    MessageTextGuoyiSuffixDeleteDialogComponent,
    messageTextRoute,
    messageTextPopupRoute,
    MessageTextGuoyiSuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...messageTextRoute,
    ...messageTextPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MessageTextGuoyiSuffixComponent,
        MessageTextGuoyiSuffixDetailComponent,
        MessageTextGuoyiSuffixDialogComponent,
        MessageTextGuoyiSuffixDeleteDialogComponent,
        MessageTextGuoyiSuffixPopupComponent,
        MessageTextGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        MessageTextGuoyiSuffixComponent,
        MessageTextGuoyiSuffixDialogComponent,
        MessageTextGuoyiSuffixPopupComponent,
        MessageTextGuoyiSuffixDeleteDialogComponent,
        MessageTextGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        MessageTextGuoyiSuffixService,
        MessageTextGuoyiSuffixPopupService,
        MessageTextGuoyiSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroMessageTextGuoyiSuffixModule {}
