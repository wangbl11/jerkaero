/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { MailboxGuoyiSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix-delete-dialog.component';
import { MailboxGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/mailbox-guoyi-suffix/mailbox-guoyi-suffix.service';

describe('Component Tests', () => {

    describe('MailboxGuoyiSuffix Management Delete Component', () => {
        let comp: MailboxGuoyiSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MailboxGuoyiSuffixDeleteDialogComponent>;
        let service: MailboxGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [MailboxGuoyiSuffixDeleteDialogComponent],
                providers: [
                    MailboxGuoyiSuffixService
                ]
            })
            .overrideTemplate(MailboxGuoyiSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MailboxGuoyiSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MailboxGuoyiSuffixService);
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
