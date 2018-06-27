/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { RegistrationGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix.component';
import { RegistrationGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix.service';
import { RegistrationGuoyiSuffix } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('RegistrationGuoyiSuffix Management Component', () => {
        let comp: RegistrationGuoyiSuffixComponent;
        let fixture: ComponentFixture<RegistrationGuoyiSuffixComponent>;
        let service: RegistrationGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [RegistrationGuoyiSuffixComponent],
                providers: [
                    RegistrationGuoyiSuffixService
                ]
            })
            .overrideTemplate(RegistrationGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistrationGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistrationGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RegistrationGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.registrations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
