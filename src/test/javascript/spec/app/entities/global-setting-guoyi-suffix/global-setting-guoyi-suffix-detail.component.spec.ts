/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { GlobalSettingGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/global-setting-guoyi-suffix/global-setting-guoyi-suffix-detail.component';
import { GlobalSettingGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/global-setting-guoyi-suffix/global-setting-guoyi-suffix.service';
import { GlobalSettingGuoyiSuffix } from '../../../../../../main/webapp/app/entities/global-setting-guoyi-suffix/global-setting-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('GlobalSettingGuoyiSuffix Management Detail Component', () => {
        let comp: GlobalSettingGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<GlobalSettingGuoyiSuffixDetailComponent>;
        let service: GlobalSettingGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [GlobalSettingGuoyiSuffixDetailComponent],
                providers: [
                    GlobalSettingGuoyiSuffixService
                ]
            })
            .overrideTemplate(GlobalSettingGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GlobalSettingGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GlobalSettingGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GlobalSettingGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.globalSetting).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
