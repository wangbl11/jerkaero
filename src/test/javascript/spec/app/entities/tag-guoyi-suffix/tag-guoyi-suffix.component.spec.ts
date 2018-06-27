/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JerkaeroTestModule } from '../../../test.module';
import { TagGuoyiSuffixComponent } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix.component';
import { TagGuoyiSuffixService } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix.service';
import { TagGuoyiSuffix } from '../../../../../../main/webapp/app/entities/tag-guoyi-suffix/tag-guoyi-suffix.model';

describe('Component Tests', () => {

    describe('TagGuoyiSuffix Management Component', () => {
        let comp: TagGuoyiSuffixComponent;
        let fixture: ComponentFixture<TagGuoyiSuffixComponent>;
        let service: TagGuoyiSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JerkaeroTestModule],
                declarations: [TagGuoyiSuffixComponent],
                providers: [
                    TagGuoyiSuffixService
                ]
            })
            .overrideTemplate(TagGuoyiSuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagGuoyiSuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagGuoyiSuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TagGuoyiSuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
