import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    RegistrationGuoyiSuffixService,
    RegistrationGuoyiSuffixPopupService,
    RegistrationGuoyiSuffixComponent,
    RegistrationGuoyiSuffixDetailComponent,
    RegistrationGuoyiSuffixDialogComponent,
    RegistrationGuoyiSuffixPopupComponent,
    RegistrationGuoyiSuffixDeletePopupComponent,
    RegistrationGuoyiSuffixDeleteDialogComponent,
    registrationRoute,
    registrationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...registrationRoute,
    ...registrationPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistrationGuoyiSuffixComponent,
        RegistrationGuoyiSuffixDetailComponent,
        RegistrationGuoyiSuffixDialogComponent,
        RegistrationGuoyiSuffixDeleteDialogComponent,
        RegistrationGuoyiSuffixPopupComponent,
        RegistrationGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        RegistrationGuoyiSuffixComponent,
        RegistrationGuoyiSuffixDialogComponent,
        RegistrationGuoyiSuffixPopupComponent,
        RegistrationGuoyiSuffixDeleteDialogComponent,
        RegistrationGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        RegistrationGuoyiSuffixService,
        RegistrationGuoyiSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroRegistrationGuoyiSuffixModule {}
