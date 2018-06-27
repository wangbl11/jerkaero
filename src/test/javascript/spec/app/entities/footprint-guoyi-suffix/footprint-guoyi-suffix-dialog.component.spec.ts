/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JerkaeroTestModule } from '../../../test.module';
import { FootprintGuoyiSuffixDialogComponent } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix-dialog.component';
import { FootprintGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.service';
import { FootprintGuoyiSuffix } from '../../../../../../main/webapp/app/entities/footprint-guoyi-suffix/footprint-guoyi-suffix.model';
import { JerkGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/jerk-guoyi-suffix';

describe('Component Tests', () => {

    describe('FootprintGuoyiSuffix Management Dialog Component', () => {
        let comp: FootprintGuoyiSuffixDialogComponent;
        let fixture: ComponentFixture<FootprintGuoyiSuffixDialogComponent>;
        let service: FootprintGuoyiSuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [FootprintGuoyiSuffixDialogComponent],
                providers: [
                    JerkGuoyiSuffixService,
                    FootprintGuoyiSuffixService
                ]
            })
            .overrideTemplate(FootprintGuoyiSuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FootprintGuoyiSuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FootprintGuoyiSuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FootprintGuoyiSuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.footprint = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'footprintListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FootprintGuoyiSuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.footprint = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'footprintListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
