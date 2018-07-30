/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { MessageTextGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix.component';
import { MessageTextGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix.service';
import { MessageTextGuoyiSuffix } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MessageTextGuoyiSuffix Management Component', () => {
        let comp: MessageTextGuoyiSuffixComponent;
        let fixture: ComponentFixture<MessageTextGuoyiSuffixComponent>;
        let service: MessageTextGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MessageTextGuoyiSuffixComponent],
                providers: [
                    MessageTextGuoyiSuffixService
                ]
            })
            .overrideTemplate(MessageTextGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageTextGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageTextGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MessageTextGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.messageTexts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
