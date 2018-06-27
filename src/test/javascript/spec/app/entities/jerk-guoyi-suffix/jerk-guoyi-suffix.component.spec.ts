/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { JerkGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix.component';
import { JerkGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix.service';
import { JerkGuoyiSuffix } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('JerkGuoyiSuffix Management Component', () => {
        let comp: JerkGuoyiSuffixComponent;
        let fixture: ComponentFixture<JerkGuoyiSuffixComponent>;
        let service: JerkGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [JerkGuoyiSuffixComponent],
                providers: [
                    JerkGuoyiSuffixService
                ]
            })
            .overrideTemplate(JerkGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JerkGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JerkGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JerkGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jerks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
