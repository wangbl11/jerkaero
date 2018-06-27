/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { RegistrationGuoyiSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix-delete-dialog.component';
import { RegistrationGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix/registration-guoyi-suffix.service';

describe('Component Tests', () => {

    describe('RegistrationGuoyiSuffix Management Delete Component', () => {
        let comp: RegistrationGuoyiSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RegistrationGuoyiSuffixDeleteDialogComponent>;
        let service: RegistrationGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [RegistrationGuoyiSuffixDeleteDialogComponent],
                providers: [
                    RegistrationGuoyiSuffixService
                ]
            })
            .overrideTemplate(RegistrationGuoyiSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistrationGuoyiSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistrationGuoyiSuffixService);
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
