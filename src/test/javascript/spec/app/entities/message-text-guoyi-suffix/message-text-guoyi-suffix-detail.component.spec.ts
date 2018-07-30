/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { MessageTextGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix-detail.component';
import { MessageTextGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix.service';
import { MessageTextGuoyiSuffix } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MessageTextGuoyiSuffix Management Detail Component', () => {
        let comp: MessageTextGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<MessageTextGuoyiSuffixDetailComponent>;
        let service: MessageTextGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MessageTextGuoyiSuffixDetailComponent],
                providers: [
                    MessageTextGuoyiSuffixService
                ]
            })
            .overrideTemplate(MessageTextGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageTextGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageTextGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MessageTextGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.messageText).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
