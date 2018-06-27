/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { PreferenceGuoyiSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix-delete-dialog.component';
import { PreferenceGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix/preference-guoyi-suffix.service';

describe('Component Tests', () => {

    describe('PreferenceGuoyiSuffix Management Delete Component', () => {
        let comp: PreferenceGuoyiSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PreferenceGuoyiSuffixDeleteDialogComponent>;
        let service: PreferenceGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [PreferenceGuoyiSuffixDeleteDialogComponent],
                providers: [
                    PreferenceGuoyiSuffixService
                ]
            })
            .overrideTemplate(PreferenceGuoyiSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferenceGuoyiSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferenceGuoyiSuffixService);
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
