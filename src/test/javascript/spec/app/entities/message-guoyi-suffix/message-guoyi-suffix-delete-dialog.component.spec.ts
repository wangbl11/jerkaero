/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { MessageGuoyiSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix-delete-dialog.component';
import { MessageGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.service';

describe('Component Tests', () => {

    describe('MessageGuoyiSuffix Management Delete Component', () => {
        let comp: MessageGuoyiSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MessageGuoyiSuffixDeleteDialogComponent>;
        let service: MessageGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MessageGuoyiSuffixDeleteDialogComponent],
                providers: [
                    MessageGuoyiSuffixService
                ]
            })
            .overrideTemplate(MessageGuoyiSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageGuoyiSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageGuoyiSuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
