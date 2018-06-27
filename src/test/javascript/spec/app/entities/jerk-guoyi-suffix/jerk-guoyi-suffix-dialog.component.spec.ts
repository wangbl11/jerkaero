/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { JerkGuoyiSuffixDialogComponent } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix-dialog.component';
import { JerkGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix.service';
import { JerkGuoyiSuffix } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix/jerk-guoyi-suffix.model';
import { RegistrationGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/registration-guoyi-suffix';
import { PreferenceGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/preference-guoyi-suffix';

describe('Component Tests', () => {

    describe('JerkGuoyiSuffix Management Dialog Component', () => {
        let comp: JerkGuoyiSuffixDialogComponent;
        let fixture: ComponentFixture<JerkGuoyiSuffixDialogComponent>;
        let service: JerkGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [JerkGuoyiSuffixDialogComponent],
                providers: [
                    RegistrationGuoyiSuffixService,
                    PreferenceGuoyiSuffixService,
                    JerkGuoyiSuffixService
                ]
            })
            .overrideTemplate(JerkGuoyiSuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JerkGuoyiSuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JerkGuoyiSuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JerkGuoyiSuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jerk = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jerkListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JerkGuoyiSuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jerk = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jerkListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
