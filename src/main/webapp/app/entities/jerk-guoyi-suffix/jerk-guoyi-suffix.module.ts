import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JerkaeroSharedModule } from '../../shared';
//import { RegistrationGuoyiSuffixDetailComponent } from '../registration-guoyi-suffix-detail.component';

import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keepHtml' })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}

import {
    JerkGuoyiSuffixService,
    JerkGuoyiSuffixPopupService,
    JerkGuoyiSuffixComponent,
    JerkGuoyiSuffixDetailComponent,
    JerkGuoyiSuffixDialogComponent,
    JerkGuoyiSuffixDeletePopupComponent,
    JerkGuoyiSuffixDeleteDialogComponent,
    jerkRoute,
    jerkPopupRoute,
    JerkGuoyiSuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...jerkRoute,
    ...jerkPopupRoute,
];

@NgModule({
    imports: [
        JerkaeroSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JerkGuoyiSuffixComponent,
        JerkGuoyiSuffixDetailComponent,
        JerkGuoyiSuffixDialogComponent,
        JerkGuoyiSuffixDeleteDialogComponent,
        JerkGuoyiSuffixDeletePopupComponent,
        EscapeHtmlPipe
    ],
    entryComponents: [
        JerkGuoyiSuffixComponent,
        JerkGuoyiSuffixDialogComponent,
        JerkGuoyiSuffixDeleteDialogComponent,
        JerkGuoyiSuffixDeletePopupComponent,
    ],
    providers: [
        JerkGuoyiSuffixService,
        JerkGuoyiSuffixPopupService,
        JerkGuoyiSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JerkaeroJerkGuoyiSuffixModule {}
