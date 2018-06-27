/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { SettingGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix.component';
import { SettingGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix.service';
import { SettingGuoyiSuffix } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('SettingGuoyiSuffix Management Component', () => {
        let comp: SettingGuoyiSuffixComponent;
        let fixture: ComponentFixture<SettingGuoyiSuffixComponent>;
        let service: SettingGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [SettingGuoyiSuffixComponent],
                providers: [
                    SettingGuoyiSuffixService
                ]
            })
            .overrideTemplate(SettingGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SettingGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SettingGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SettingGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.settings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
