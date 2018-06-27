/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JerkaeroTestModule } from '../../../test.module';
import { TagGuoyiSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix-detail.component';
import { TagGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix.service';
import { TagGuoyiSuffix } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('TagGuoyiSuffix Management Detail Component', () => {
        let comp: TagGuoyiSuffixDetailComponent;
        let fixture: ComponentFixture<TagGuoyiSuffixDetailComponent>;
        let service: TagGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [TagGuoyiSuffixDetailComponent],
                providers: [
                    TagGuoyiSuffixService
                ]
            })
            .overrideTemplate(TagGuoyiSuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagGuoyiSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TagGuoyiSuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tag).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
