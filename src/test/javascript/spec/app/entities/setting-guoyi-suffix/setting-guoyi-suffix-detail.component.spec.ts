/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { SettingGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix-detail.component';
import { SettingGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix.service';
import { SettingGuoyiSuffix } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('SettingGuoyiSuffix Management Detail Component', () => {
        let comp: SettingGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<SettingGuoyiSuffixDetailComponent>;
        let service: SettingGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [SettingGuoyiSuffixDetailComponent],
                providers: [
                    SettingGuoyiSuffixService
                ]
            })
            .overrideTemplate(SettingGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SettingGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SettingGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SettingGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.setting).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
