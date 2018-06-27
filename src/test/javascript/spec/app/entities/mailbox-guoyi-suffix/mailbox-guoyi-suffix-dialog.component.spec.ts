/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { MailboxGuoyiSuffixDialogComponent } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix-dialog.component';
import { MailboxGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.service';
import { MailboxGuoyiSuffix } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.model';
import { JerkGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix';

describe('Component Tests', () => {

    describe('MailboxGuoyiSuffix Management Dialog Component', () => {
        let comp: MailboxGuoyiSuffixDialogComponent;
        let fixture: ComponentFixture<MailboxGuoyiSuffixDialogComponent>;
        let service: MailboxGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MailboxGuoyiSuffixDialogComponent],
                providers: [
                    JerkGuoyiSuffixService,
                    MailboxGuoyiSuffixService
                ]
            })
            .overrideTemplate(MailboxGuoyiSuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MailboxGuoyiSuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MailboxGuoyiSuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MailboxGuoyiSuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mailbox = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mailboxListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MailboxGuoyiSuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mailbox = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mailboxListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
