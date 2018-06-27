/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { JerkGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix-detail.component';
import { JerkGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix.service';
import { JerkGuoyiSuffix } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('JerkGuoyiSuffix Management Detail Component', () => {
        let comp: JerkGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<JerkGuoyiSuffixDetailComponent>;
        let service: JerkGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [JerkGuoyiSuffixDetailComponent],
                providers: [
                    JerkGuoyiSuffixService
                ]
            })
            .overrideTemplate(JerkGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JerkGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JerkGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JerkGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jerk).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
