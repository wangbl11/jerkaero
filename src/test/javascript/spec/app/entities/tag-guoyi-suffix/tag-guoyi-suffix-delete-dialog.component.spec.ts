/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { TagGuoyiSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix-delete-dialog.component';
import { TagGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix.service';

describe('Component Tests', () => {

    describe('TagGuoyiSuffix Management Delete Component', () => {
        let comp: TagGuoyiSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TagGuoyiSuffixDeleteDialogComponent>;
        let service: TagGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [TagGuoyiSuffixDeleteDialogComponent],
                providers: [
                    TagGuoyiSuffixService
                ]
            })
            .overrideTemplate(TagGuoyiSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagGuoyiSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagGuoyiSuffixService);
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
