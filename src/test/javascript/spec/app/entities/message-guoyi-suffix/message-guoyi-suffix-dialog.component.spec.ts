/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { MessageGuoyiSuffixDialogComponent } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix-dialog.component';
import { MessageGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.service';
import { MessageGuoyiSuffix } from '../../../../../../main/webapp/app/entities/message-guoyi-suffix/message-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('MessageGuoyiSuffix Management Dialog Component', () => {
        let comp: MessageGuoyiSuffixDialogComponent;
        let fixture: ComponentFixture<MessageGuoyiSuffixDialogComponent>;
        let service: MessageGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MessageGuoyiSuffixDialogComponent],
                providers: [
                    MessageGuoyiSuffixService
                ]
            })
            .overrideTemplate(MessageGuoyiSuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageGuoyiSuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageGuoyiSuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MessageGuoyiSuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.message = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'messageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MessageGuoyiSuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.message = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'messageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
