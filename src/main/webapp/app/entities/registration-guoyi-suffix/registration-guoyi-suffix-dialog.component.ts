import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';


import { RegistrationGuoyiSuffix } from './registration-guoyi-suffix.model';
import { RegistrationGuoyiSuffixPopupService } from './registration-guoyi-suffix-popup.service';
import { RegistrationGuoyiSuffixService } from './registration-guoyi-suffix.service';
import { JerkGuoyiSuffix } from '../jerk-guoyi-suffix';
import { JerkGuoyiSuffixService } from '../jerk-guoyi-suffix';

@Component({
    selector: 'jhi-registration-guoyi-suffix-dialog',
    templateUrl: './registration-guoyi-suffix-dialog.component.html'
})
export class RegistrationGuoyiSuffixDialogComponent implements OnInit {

    jerk: JerkGuoyiSuffix;
    registration: RegistrationGuoyiSuffix;
    private subscription: any;
    isSaving: boolean;
    createdDateDp: any;
    modifiedDateDp: any;
    isZclx: boolean;
    zclxArray:any[]=[
      {"key":"A1","state":false},{"key":"A2","state":false},{"key":"A3","state":false},
      {"key":"A4","state":false},{"key":"A5","state":false},{"key":"A6","state":false},
      {"key":"A7","state":false},{"key":"A8","state":false},{"key":"A9","state":false},
      {"key":"A10","state":false}
    ];
    sfxyxcArray:any[]=[
     {"key":"A1","state":false},{"key":"A2","state":false},
     {"key":"A3","state":false},{"key":"A4","state":false}
    ]

    constructor(
        private router: Router,
        private registrationService: RegistrationGuoyiSuffixService,
        private jerkService: JerkGuoyiSuffixService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.isZclx=false;
        
           this.subscription = this.route.params.subscribe((params) => {
             if(params['id'])
               this.load(params['id']);
             else
             {
               if (params['jerkId'])
               {
                 this.loadJerk(params['jerkId']);
               }
             }
           });

    }
    load(id) {
        this.registrationService.find(id)
            .subscribe((registrationResponse: HttpResponse<RegistrationGuoyiSuffix>) => {
                this.registration = registrationResponse.body;
                let _v=JSON.parse(this.registration.sfxyxc);
                for (let i=0;i<4;i++){
                   if (_v[i]==1)
                     this.sfxyxcArray[i].state=true;
                }
                _v=JSON.parse(this.registration.wlxwhdzclx);
                for (let i=0;i<10;i++){
                   if (_v[i]==1)
                      this.zclxArray[i].state=true;
                }
        });
    }

    loadJerk(id) {
           this.jerkService.find(id)
            .subscribe((jerkResponse: HttpResponse<JerkGuoyiSuffix>) => {
                this.jerk = jerkResponse.body;
                this.registration =new RegistrationGuoyiSuffix();
                this.registration.fbzt=0;
                //this.jerk.jerkInfo=this.registration;
            });
    }
    
    previousState() {
        window.history.back();
    }
    
    save() {
        let _v=[];
        for (let i=0;i<10;i++){
          let one=this.zclxArray[i];
          if (one.state)
            _v.push(1);
          else
            _v.push(0);    
        }
        this.registration.wlxwhdzclx=JSON.stringify(_v);
        
        _v=[];
        for (let i=0;i<4;i++){
          let one=this.sfxyxcArray[i];
          if (one.state)
            _v.push(1);
          else
            _v.push(0);
        }
        this.registration.sfxyxc=JSON.stringify(_v);
         
        this.isSaving = true;
        if (this.registration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registrationService.update(this.registration));
        } else {
            //this.subscribeToSaveResponse(
            //    this.registrationService.create(this.registration));
            this.jerk.jerkInfo=this.registration;
            if (this.jerk.preference&&!this.jerk.preference['id'])
               this.jerk.preference=null;
            this.subscribeToSaveJerkResponse(
                this.jerkService.update(this.jerk));
        }
    }

    private subscribeToSaveJerkResponse(result: Observable<HttpResponse<JerkGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<JerkGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }
    private subscribeToSaveResponse(result: Observable<HttpResponse<RegistrationGuoyiSuffix>>) {
        result.subscribe((res: HttpResponse<RegistrationGuoyiSuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RegistrationGuoyiSuffix) {
        this.eventManager.broadcast({ name: 'registrationListModification', content: 'OK'});
        this.isSaving = false;
        //this.activeModal.dismiss(result);
        this.router.navigate(['/jerk-guoyi-suffix']);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-registration-guoyi-suffix-popup',
    template: ''
})
export class RegistrationGuoyiSuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationPopupService: RegistrationGuoyiSuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.registrationPopupService
                    .open(RegistrationGuoyiSuffixDialogComponent as Component, params['id']);
            } else {
                this.registrationPopupService
                    .open(RegistrationGuoyiSuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
