/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { SettingGuoyiSuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix-delete-dialog.component';
import { SettingGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/setting-guoyi-suffix/setting-guoyi-suffix.service';

describe('Component Tests', () => {

    describe('SettingGuoyiSuffix Management Delete Component', () => {
        let comp: SettingGuoyiSuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SettingGuoyiSuffixDeleteDialogComponent>;
        let service: SettingGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [SettingGuoyiSuffixDeleteDialogComponent],
                providers: [
                    SettingGuoyiSuffixService
                ]
            })
            .overrideTemplate(SettingGuoyiSuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SettingGuoyiSuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SettingGuoyiSuffixService);
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
