/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { MailboxGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.component';
import { MailboxGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.service';
import { MailboxGuoyiSuffix } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MailboxGuoyiSuffix Management Component', () => {
        let comp: MailboxGuoyiSuffixComponent;
        let fixture: ComponentFixture<MailboxGuoyiSuffixComponent>;
        let service: MailboxGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MailboxGuoyiSuffixComponent],
                providers: [
                    MailboxGuoyiSuffixService
                ]
            })
            .overrideTemplate(MailboxGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MailboxGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MailboxGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MailboxGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mailboxes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
