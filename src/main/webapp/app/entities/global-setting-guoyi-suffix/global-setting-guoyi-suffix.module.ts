import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
import {
    GlobalSettingGuoyiSuffixService,
    GlobalSettingGuoyiSuffixPopupService,
    GlobalSettingGuoyiSuffixComponent,
    GlobalSettingGuoyiSuffixDetailComponent,
    GlobalSettingGuoyiSuffixDialogComponent,
    GlobalSettingGuoyiSuffixPopupComponent,
    GlobalSettingGuoyiSuffixDeletePopupComponent,
    GlobalSettingGuoyiSuffixDeleteDialogComponent,
    globalSettingRoute,
    globalSettingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...globalSettingRoute,
    ...globalSettingPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GlobalSettingGuoyiSuffixComponent,
        GlobalSettingGuoyiSuffixDetailComponent,
        GlobalSettingGuoyiSuffixDialogComponent,
        GlobalSettingGuoyiSuffixDeleteDialogComponent,
        GlobalSettingGuoyiSuffixPopupComponent,
        GlobalSettingGuoyiSuffixDeletePopupComponent,
    ],
    entryComponents: [
        GlobalSettingGuoyiSuffixComponent,
        GlobalSettingGuoyiSuffixDialogComponent,
        GlobalSettingGuoyiSuffixPopupComponent,
        GlobalSettingGuoyiSuffixDeleteDialogComponent,
        GlobalSettingGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        GlobalSettingGuoyiSuffixService,
        GlobalSettingGuoyiSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroGlobalSettingGuoyiSuffixModule {}
