/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { MailboxGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix-detail.component';
import { MailboxGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.service';
import { MailboxGuoyiSuffix } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MailboxGuoyiSuffix Management Detail Component', () => {
        let comp: MailboxGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<MailboxGuoyiSuffixDetailComponent>;
        let service: MailboxGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MailboxGuoyiSuffixDetailComponent],
                providers: [
                    MailboxGuoyiSuffixService
                ]
            })
            .overrideTemplate(MailboxGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MailboxGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MailboxGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MailboxGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mailbox).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
