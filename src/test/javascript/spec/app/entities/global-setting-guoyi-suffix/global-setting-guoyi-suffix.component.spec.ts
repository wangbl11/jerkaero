/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { GlobalSettingGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/global-setting-guoyi-suffix/global-setting-guoyi-suffix.component';
import { GlobalSettingGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/global-setting-guoyi-suffix/global-setting-guoyi-suffix.service';
import { GlobalSettingGuoyiSuffix } from '../../../../../../main/webapp/app/entities/global-setting-guoyi-suffix/global-setting-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('GlobalSettingGuoyiSuffix Management Component', () => {
        let comp: GlobalSettingGuoyiSuffixComponent;
        let fixture: ComponentFixture<GlobalSettingGuoyiSuffixComponent>;
        let service: GlobalSettingGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [GlobalSettingGuoyiSuffixComponent],
                providers: [
                    GlobalSettingGuoyiSuffixService
                ]
            })
            .overrideTemplate(GlobalSettingGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GlobalSettingGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GlobalSettingGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GlobalSettingGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.globalSettings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
