/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { PreferenceGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix.component';
import { PreferenceGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix.service';
import { PreferenceGuoyiSuffix } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('PreferenceGuoyiSuffix Management Component', () => {
        let comp: PreferenceGuoyiSuffixComponent;
        let fixture: ComponentFixture<PreferenceGuoyiSuffixComponent>;
        let service: PreferenceGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [PreferenceGuoyiSuffixComponent],
                providers: [
                    PreferenceGuoyiSuffixService
                ]
            })
            .overrideTemplate(PreferenceGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferenceGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferenceGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PreferenceGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.preferences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
