/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { PreferenceGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix-detail.component';
import { PreferenceGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix.service';
import { PreferenceGuoyiSuffix } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('PreferenceGuoyiSuffix Management Detail Component', () => {
        let comp: PreferenceGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<PreferenceGuoyiSuffixDetailComponent>;
        let service: PreferenceGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [PreferenceGuoyiSuffixDetailComponent],
                providers: [
                    PreferenceGuoyiSuffixService
                ]
            })
            .overrideTemplate(PreferenceGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferenceGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferenceGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PreferenceGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.preference).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
