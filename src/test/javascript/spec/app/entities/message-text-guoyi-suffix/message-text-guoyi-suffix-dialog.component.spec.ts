/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { MessageTextGuoyiSuffixDialogComponent } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix-dialog.component';
import { MessageTextGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix.service';
import { MessageTextGuoyiSuffix } from '../../../../../../main/webapp/app/entities/message-text-guoyi-suffix/message-text-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MessageTextGuoyiSuffix Management Dialog Component', () => {
        let comp: MessageTextGuoyiSuffixDialogComponent;
        let fixture: ComponentFixture<MessageTextGuoyiSuffixDialogComponent>;
        let service: MessageTextGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MessageTextGuoyiSuffixDialogComponent],
                providers: [
                    MessageTextGuoyiSuffixService
                ]
            })
            .overrideTemplate(MessageTextGuoyiSuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageTextGuoyiSuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageTextGuoyiSuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MessageTextGuoyiSuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.messageText = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'messageTextListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MessageTextGuoyiSuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.messageText = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'messageTextListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
