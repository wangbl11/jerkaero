import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    SettingGuoyiSuffixService,
    SettingGuoyiSuffixPopupService,
    SettingGuoyiSuffixComponent,
    SettingGuoyiSuffixDetailComponent,
    SettingGuoyiSuffixDialogComponent,
    SettingGuoyiSuffixPopupComponent,
    SettingGuoyiSuffixDeletePopupComponent,
    SettingGuoyiSuffixDeleteDialogComponent,
    settingRoute,
    settingPopupRoute,
    SettingGuoyiSuffixResolvePagingParams
} from './';

const ENTITY_STATES = [
    ...settingRoute,
    ...settingPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SettingGuoyiSuffixComponent,
        SettingGuoyiSuffixDetailComponent,
        SettingGuoyiSuffixDialogComponent,
        SettingGuoyiSuffixDeleteDialogComponent,
        SettingGuoyiSuffixPopupComponent,
        SettingGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        SettingGuoyiSuffixComponent,
        SettingGuoyiSuffixDialogComponent,
        SettingGuoyiSuffixPopupComponent,
        SettingGuoyiSuffixDeleteDialogComponent,
        SettingGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        SettingGuoyiSuffixService,
        SettingGuoyiSuffixPopupService,
        SettingGuoyiSuffixResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroSettingGuoyiSuffixModule {}
