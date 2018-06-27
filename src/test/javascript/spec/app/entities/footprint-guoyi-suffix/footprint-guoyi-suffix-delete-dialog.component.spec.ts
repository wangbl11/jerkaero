/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { FootprintGuoyiSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix-delete-dialog.component';
import { FootprintGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.service';

describe('Component Tests', () => {

    describe('FootprintGuoyiSuffix Management Delete Component', () => {
        let comp: FootprintGuoyiSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FootprintGuoyiSuffixDeleteDialogComponent>;
        let service: FootprintGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [FootprintGuoyiSuffixDeleteDialogComponent],
                providers: [
                    FootprintGuoyiSuffixService
                ]
            })
            .overrideTemplate(FootprintGuoyiSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FootprintGuoyiSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FootprintGuoyiSuffixService);
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
