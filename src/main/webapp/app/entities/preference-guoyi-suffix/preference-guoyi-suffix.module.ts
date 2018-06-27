import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    PreferenceGuoyiSuffixService,
    PreferenceGuoyiSuffixPopupService,
    PreferenceGuoyiSuffixComponent,
    PreferenceGuoyiSuffixDetailComponent,
    PreferenceGuoyiSuffixDialogComponent,
    PreferenceGuoyiSuffixPopupComponent,
    PreferenceGuoyiSuffixDeletePopupComponent,
    PreferenceGuoyiSuffixDeleteDialogComponent,
    preferenceRoute,
    preferencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...preferenceRoute,
    ...preferencePopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PreferenceGuoyiSuffixComponent,
        PreferenceGuoyiSuffixDetailComponent,
        PreferenceGuoyiSuffixDialogComponent,
        PreferenceGuoyiSuffixDeleteDialogComponent,
        PreferenceGuoyiSuffixPopupComponent,
        PreferenceGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        PreferenceGuoyiSuffixComponent,
        PreferenceGuoyiSuffixDialogComponent,
        PreferenceGuoyiSuffixPopupComponent,
        PreferenceGuoyiSuffixDeleteDialogComponent,
        PreferenceGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        PreferenceGuoyiSuffixService,
        PreferenceGuoyiSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroPreferenceGuoyiSuffixModule {}
