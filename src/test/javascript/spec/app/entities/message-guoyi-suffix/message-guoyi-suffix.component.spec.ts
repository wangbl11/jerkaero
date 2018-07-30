/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { MessageGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.component';
import { MessageGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.service';
import { MessageGuoyiSuffix } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MessageGuoyiSuffix Management Component', () => {
        let comp: MessageGuoyiSuffixComponent;
        let fixture: ComponentFixture<MessageGuoyiSuffixComponent>;
        let service: MessageGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MessageGuoyiSuffixComponent],
                providers: [
                    MessageGuoyiSuffixService
                ]
            })
            .overrideTemplate(MessageGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MessageGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.messages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
