import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    MailboxGuoyiSuffixService,
    MailboxGuoyiSuffixPopupService,
    MailboxGuoyiSuffixComponent,
    MailboxGuoyiSuffixDetailComponent,
    MailboxGuoyiSuffixDialogComponent,
    MailboxGuoyiSuffixPopupComponent,
    MailboxGuoyiSuffixDeletePopupComponent,
    MailboxGuoyiSuffixDeleteDialogComponent,
    mailboxRoute,
    mailboxPopupRoute,
    MailboxGuoyiSuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...mailboxRoute,
    ...mailboxPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MailboxGuoyiSuffixComponent,
        MailboxGuoyiSuffixDetailComponent,
        MailboxGuoyiSuffixDialogComponent,
        MailboxGuoyiSuffixDeleteDialogComponent,
        MailboxGuoyiSuffixPopupComponent,
        MailboxGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        MailboxGuoyiSuffixComponent,
        MailboxGuoyiSuffixDialogComponent,
        MailboxGuoyiSuffixPopupComponent,
        MailboxGuoyiSuffixDeleteDialogComponent,
        MailboxGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        MailboxGuoyiSuffixService,
        MailboxGuoyiSuffixPopupService,
        MailboxGuoyiSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroMailboxGuoyiSuffixModule {}
