import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JerkaeroJerkGuoyiSuffixModule } from './jerk-guoyi-suffix/jerk-guoyi-suffix.module';
import { JerkaeroRegistrationGuoyiSuffixModule } from './registration-guoyi-suffix/registration-guoyi-suffix.module';
import { JerkaeroPreferenceGuoyiSuffixModule } from './preference-guoyi-suffix/preference-guoyi-suffix.module';
import { JerkaeroMailboxGuoyiSuffixModule } from './mailbox-guoyi-suffix/mailbox-guoyi-suffix.module';
import { JerkaeroTagGuoyiSuffixModule } from './tag-guoyi-suffix/tag-guoyi-suffix.module';
import { JerkaeroSettingGuoyiSuffixModule } from './setting-guoyi-suffix/setting-guoyi-suffix.module';
import { JerkaeroFootprintGuoyiSuffixModule } from './footprint-guoyi-suffix/footprint-guoyi-suffix.module';
import { JerkaeroGlobalSettingGuoyiSuffixModule } from './global-setting-guoyi-suffix/global-setting-guoyi-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JerkaeroJerkGuoyiSuffixModule,
        JerkaeroRegistrationGuoyiSuffixModule,
        JerkaeroPreferenceGuoyiSuffixModule,
        JerkaeroMailboxGuoyiSuffixModule,
        JerkaeroTagGuoyiSuffixModule,
        JerkaeroSettingGuoyiSuffixModule,
        JerkaeroFootprintGuoyiSuffixModule,
        JerkaeroGlobalSettingGuoyiSuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroEntityModule {}
