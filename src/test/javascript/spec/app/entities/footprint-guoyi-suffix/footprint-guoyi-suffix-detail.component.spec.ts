/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { FootprintGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix-detail.component';
import { FootprintGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.service';
import { FootprintGuoyiSuffix } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('FootprintGuoyiSuffix Management Detail Component', () => {
        let comp: FootprintGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<FootprintGuoyiSuffixDetailComponent>;
        let service: FootprintGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [FootprintGuoyiSuffixDetailComponent],
                providers: [
                    FootprintGuoyiSuffixService
                ]
            })
            .overrideTemplate(FootprintGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FootprintGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FootprintGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FootprintGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.footprint).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
