/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { MessageGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix-detail.component';
import { MessageGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.service';
import { MessageGuoyiSuffix } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MessageGuoyiSuffix Management Detail Component', () => {
        let comp: MessageGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<MessageGuoyiSuffixDetailComponent>;
        let service: MessageGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MessageGuoyiSuffixDetailComponent],
                providers: [
                    MessageGuoyiSuffixService
                ]
            })
            .overrideTemplate(MessageGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MessageGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.message).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
