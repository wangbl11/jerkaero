/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { RegistrationGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix-detail.component';
import { RegistrationGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix.service';
import { RegistrationGuoyiSuffix } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('RegistrationGuoyiSuffix Management Detail Component', () => {
        let comp: RegistrationGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<RegistrationGuoyiSuffixDetailComponent>;
        let service: RegistrationGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [RegistrationGuoyiSuffixDetailComponent],
                providers: [
                    RegistrationGuoyiSuffixService
                ]
            })
            .overrideTemplate(RegistrationGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistrationGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistrationGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RegistrationGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.registration).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
