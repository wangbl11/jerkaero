/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { FootprintGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.component';
import { FootprintGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.service';
import { FootprintGuoyiSuffix } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('FootprintGuoyiSuffix Management Component', () => {
        let comp: FootprintGuoyiSuffixComponent;
        let fixture: ComponentFixture<FootprintGuoyiSuffixComponent>;
        let service: FootprintGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [FootprintGuoyiSuffixComponent],
                providers: [
                    FootprintGuoyiSuffixService
                ]
            })
            .overrideTemplate(FootprintGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FootprintGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FootprintGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FootprintGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.footprints[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
