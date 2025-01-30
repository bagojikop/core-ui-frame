import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
// import { NavbarActions, http, ngselectpagination, Master } from 'src/app/assets/services/services';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { MyProvider } from 'src/app/assets/services/provider';
// import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

declare var $: any;
interface AccountObj {
  accCode: number
  sgCode: number
  accName: string
  accAlias: string
  createdUser: string
  modifiedUser: string
  createdDt: string
  modifiedDt: string
  placeId: number
  blocked: boolean
  headOfficCode: string
  accAddress?: accAddressObj
  accBankDetail?: accBankDetailObj | null
  accPanDetail?: accPanDetailObj | null
  accGstDetails?: accGstDetailObj[]
  accLicenses?: accLicenseObj[]
  accBusinessLocations?: accBusinessLocationObj[]
  sgCodeNavigation: any
  placeIdNavigation?:any;
  grpCodeNavigation: grpCodeNavigationObj
}
interface grpCodeNavigationObj {
  mgCode: number;
}
interface accLicenseObj {
  licdetl: number;
  accCode: number;
  licNo: string;
  type: string;
  licDate: string;
}
interface accBusinessLocationObj {
  detlId: number;
  accCode: number;
  addName: string;
  cityId: number;
  address1: string;
  address2: string;
  city: any;
}

interface accAddressObj {
  accCode: number;
  accAddress1: string;
  accAddress2: string;
  contactPerson: string;
  contactDesignation: string;
  contactMobileNo: string;
  offTelNo: string;
  emailId: string;
  yearOfEstablishment: string;
  website: string;
}
interface accBankDetailObj {
  accCode?: number;
  bankName?: string;
  address?: string;
  bankaccNo?: string;
  ifscCode?: string;
}
interface accPanDetailObj {
  accCode: number;
  creditLimit: number | null
  creditLimitDays: number;
  firmType: number;
  accPanNo: string;
  accTanNo: string;
  accCinNo: string;
  currencyCode: string;
}
interface accGstDetailObj {
  accCode: number;
  gstrDate?: string;
  gstur: number;
  accGstn: string;
  gst_typ_name?:string;
}
interface cityObj {
  cityId: number
  cityName: string
}

@Component({
  selector: 'app-add-grid-data',
  standalone: true,
  imports: [],
  templateUrl: './add-grid-data.component.html',
  styleUrl: './add-grid-data.component.scss'
})
export class AddGridDataComponent {
  //@ViewChild("account") account: NgForm;
  entity: AccountObj;
  reference: any = {};
  acc: any = {};
  status: boolean = false;
  ngview: boolean = false;
  stateParams: any;
  mode: any;
  rowIndex: any;
  //param;
  loading: boolean = false;
  placebuffer = [];
  viewing1: number = 1;
  viewing2: number = 2;
  isGstValid : boolean = true;
 // pastentity;
//StyleCase = StyleCase; 
  gstininfo: any = {};

  constructor(public location: Location,
    //public http: http,
    //private datepipe: DatePipe,
   // private dialog: DialogsComponent,
   // private spinner: NgxSpinnerService,
    //@Inject('navactions') public navactions: any,
   // @Inject('ngselectpagination') public ngselect: any,
    //@Inject('master') public master: any,
    public cd: ChangeDetectorRef,
  ) {
    this.entity = <AccountObj>{};
    this.stateParams = this.location.getState();
    this.mode = this.stateParams.action;
    this.entity.accCode = this.stateParams.id;
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    setInterval(() => {
      this.windowrespo();
    }, 1000)

    this.entity = <AccountObj>{};
    this.entity.accPanDetail = <accPanDetailObj>{};
    this.acc.accBusinessLocations = <accBusinessLocationObj>{};
    this.acc.accBusinessLocations.city = <cityObj>{};
    this.reference.accLicenses = <accLicenseObj>{};
    this.entity.accGstDetails = <accGstDetailObj[]>[];
    this.entity.accAddress = <accAddressObj>{};
    this.entity.accBankDetail = <accBankDetailObj>{};
    this.entity.grpCodeNavigation = <grpCodeNavigationObj>{};
    this.reference.groups = [];
    this.reference.places = [];
    this.reference.jeson = [];
    this.reference.gstTypes = [];
    this.reference.firms = [];

    let paramss: any = this.location.getState();
    //this.navactions.navaction(paramss.action);
    this.entity.accCode = paramss.id;

    if (this.entity.accCode) {
      //this.navactions.fieldset = true;
      this.callbackedit();
    } else {
      //this.navactions.fieldset = false;
      this.newRecord();
    }
    this.Init();
  }

  getPlaceIdNavigation(): any {
    return  this.entity.placeIdNavigation
   }

  windowrespo() {
    if (window.innerWidth <= 767) {
      this.status = true;



    } else {
      this.status = false;
    }
  }

  isGstinInvalid(): boolean {
    const gstin = this.gstininfo.accGstn || ''; // Ensure gstininfo.accGstn is not null or undefined
    return gstin.length > 0 && gstin.length < 15;
  }
  
  Init() {
    // this.http.jsonget('assets/json/currancy.json').subscribe({
    //   next: (res: any) => {
    //     this.reference.jeson = res;
    //   }, error: err => {
    //     this.dialog.swal({ dialog: 'error', title: 'Error', message: err });
    //   }
    // })

    // this.http.jsonget('assets/json/GSTURLIST.json').subscribe({
    //   next: (res: any) => {
    //     this.reference.gstTypes = res;
    //   }, error: err => {
    //     this.dialog.swal({ dialog: 'error', title: 'Error', message: err });
    //   }
    // })

    // //firm type

    // this.http.get('FirmType/list').subscribe({
    //   next: (res: any) => {
    //     if (res.status_cd == 1) {
    //       this.reference.firms = res.data;
    //     } else {
    //       this.dialog.swal({ dialog: 'error', title: 'Error', message: res.errors.exception.Message });
    //     }


    //     this.spinner.hide();
    //   }, error: (err: any) => {
    //     this.spinner.hide();
    //     this.dialog.swal({ dialog: 'error', title: 'Error', message: err.message });
    //   }
    // })

  }
  navbar(w:any) {
    switch (w) {
      case 'new':
        this.newRecord();
        break;

      case 'edit':

        this.edit();

        break;

      case 'save':
        this.save();
        break;

      case 'undo':
        this.undo();
        break;

      case 'print':
        this.ngview = true;
        break;

      case 'close':
        this.close();
        break;
    }

  }


  updateModel() {
    //this.entity.placeId = index.value;
  }


  callbackedit() {
    // this.spinner.show();
    // var url = "Account/Accountedit"
    // this.http.get(url, { id: this.entity.accCode }).subscribe({
    //   next: (res: any) => {
    //     if (res.status_cd == 1) {
    //       this.entity = res.data;
    //       this.pastentity= JSON.parse(JSON.stringify(this.entity))
    //       this.entity.accPanDetail = this.entity.accPanDetail || <accPanDetailObj>{};
    //       this.entity.accGstDetails = this.entity.accGstDetails || <accGstDetailObj[]>[];
    //       this.entity.accAddress = this.entity.accAddress || <accAddressObj>{};
    //       this.entity.accBankDetail = this.entity.accBankDetail || <accBankDetailObj>{};

    //       this.entity.createdDt = this.entity.createdDt ? this.datepipe.transform(this.entity.createdDt, 'yyyy-MM-dd') : null;
    //       this.entity.modifiedDt = this.entity.modifiedDt ? this.datepipe.transform(this.entity.modifiedDt, 'yyyy-MM-dd') : null;

    //       this.pastentity = Object.assign({}, this.entity);
    //       this.entity.accGstDetails.forEach(element => {
    //         element.gst_typ_name= this.reference.gstTypes.filter(s=>s.cd==element.gstur)[0].nm
            
    //         element.gstrDate = element.gstrDate ? this.datepipe.transform(element.gstrDate, 'yyyy-MM-dd') : null;
    //       })
         
    //       this.onSelectGroup(this.entity.sgCodeNavigation);
    //     }
    //     this.spinner.hide();

    //   }, error: (err: any) => {
    //     this.spinner.hide();
    //     this.dialog.swal({ dialog: 'error', title: 'Error', message: err });
    //   }
    // })
  }
  
  save() {
    // if (this.account.valid) {
    //   this.spinner.show();
    //   if (!this.entity.accCode) {
    //     if (!this.entity.createdUser)
    //       this.entity.createdUser = this.provider.companyinfo.userinfo.username;

    //     this.http.post('Account/insert', this.master.cleanObject(this.entity, 2)).subscribe({
    //       next: (res: any) => {
    //         if (res.status_cd == 1) {

    //           this.entity.accCode = res.data.accCode;
    //           this.pastentity= JSON.parse(JSON.stringify(this.entity))

    //           if (!this.entity.accBankDetail) {
    //             this.entity.accBankDetail = <accBankDetailObj>{};
    //           }
    //           if (!this.entity.accAddress) {
              
    //             this.entity.accAddress = <accAddressObj>{};
    //           }

    //           if (!this.entity.accPanDetail) {
    //             this.entity.accPanDetail = <accPanDetailObj>{};
    //           }

    //           this.dialog.swal({ dialog: "success", title: "Success", message: "Record is saved sucessfully" });
    //           this.navactions.navaction("OK");
    //         }
    //         else {
    //           this.dialog.swal({ dialog: 'error', title: 'Error', message: res.errors.exception.InnerException.message })
    //         }
    //         this.spinner.hide();



    //       }, error: (err: any) => {
    //         this.spinner.hide()
    //         this.dialog.swal({ dialog: 'error', title: 'Error', message: err.message })
    //       }
    //     })
    //   }
    //   else {
    //     this.entity.modifiedUser = this.provider.companyinfo.userinfo.username;
    //     // this.http.put('Account/update', this.master.cleanObject(this.entity, 2), { id: this.entity.accCode }).subscribe({
    //     //   next: (res: any) => {

    //     //     if (res.status_cd == 1) {
    //     //       this.entity.accCode = res.data.accCode;
    //     //       if (!this.entity.accBankDetail) {
    //     //         this.entity.accBankDetail = <accBankDetailObj>{};
    //     //       }
    //     //       if (!this.entity.accAddress) {
    //     //         this.entity.accAddress = <accAddressObj>{};
    //     //       }
    //     //       if (!this.entity.accPanDetail) {
    //     //         this.entity.accPanDetail = <accPanDetailObj>{};
    //     //       }
    //     //       // let idx = this.provider.ShareData.Acclist.map(item => {
    //     //       //   return item.accCode
    //     //       // }).indexOf(this.entity.accCode)
    //     //       // if (idx >= 0)
    //     //       //   this.provider.ShareData.Acclist[idx] = this.entity;

    //     //      // this.dialog.swal({ dialog: "success", title: "Success", message: "Record is Update sucessfully" });
    //     //       this.navactions.navaction("OK");
    //     //     }

    //     //    // this.spinner.hide()
    //     //   }, error: (err: any) => {
    //     //    // this.dialog.swal({ dialog: 'error', title: 'Error', message: err })
    //     //   }
    //     // })
    //   }
    // }
    // else {
    //   this.navactions.navaction('new');
    //   //this.dialog.swal({ dialog: 'error', title: 'Error', message: "Please Fill All Required fields." })

    // }
  }
  onSelectGroup() {


    // var grpCodes = [5, 14, 4, 25, 27]
    // if (grpCodes.findIndex(item => { return item == (event?.value?.grpCodeNavigation?.mgCode || event?.grpCodeNavigation?.mgCode)}) >= 0) {
    //   this.viewing1 = 1;
    //   this.viewing2 = 2;


    // } else {
    //   this.viewing1 = 1;
    //   //this.viewing2 = null;

    // }
    // if (this.viewing2 == 2) {


    //   this.entity.accPanDetail = this.reference.oldEntity?.accPanDetail || <accPanDetailObj>{};
    //   this.entity.accGstDetails = this.reference.oldEntity?.accGstDetails || <accGstDetailObj[]>[];
    //   this.entity.accLicenses = this.reference.oldEntity?.accLicenses || <accLicenseObj[]>[];
    //   this.entity.accAddress = this.reference.oldEntity?.accAddress || <accAddressObj>{};
    //   this.entity.accBankDetail = this.reference.oldEntity?.accBankDetail || <accBankDetailObj>{};
    //   this.entity.accBusinessLocations = this.reference.oldEntity?.accBusinessLocations || <accBusinessLocationObj[]>[];


    // }
    // else {
    //   this.reference.oldEntity = {};
    //   this.reference.oldEntity.accPanDetail = this.entity.accPanDetail;
    //   this.reference.oldEntity.accGstDetails = this.entity.accGstDetails;
    //   this.reference.oldEntity.accLicenses = this.entity.accLicenses;
    //   this.reference.oldEntity.accAddress = this.entity.accAddress;
    //   this.reference.oldEntity.accBankDetail = this.entity.accBankDetail;
    //   this.reference.oldEntity.accBusinessLocations = this.entity.accBusinessLocations;

    //   this.entity.accPanDetail = <accPanDetailObj>{};
    //   this.entity.accGstDetails = <accGstDetailObj[]>[];
    //   this.entity.accLicenses = <accLicenseObj[]>[];
    //   this.entity.accAddress = <accAddressObj>{}
    //   this.entity.accBankDetail = <accBankDetailObj>{};
    //   this.entity.accBusinessLocations = <accBusinessLocationObj[]>[];

    // }

  }
  close() {
    this.location.back();
  }
  newRecord() {
    //this.pastentity= JSON.parse(JSON.stringify(this.entity))
    this.entity = <AccountObj>{};
    this.entity.accAddress = <accAddressObj>{};
    this.entity.accBankDetail = <accBankDetailObj>{};
    this.entity.accPanDetail = <accPanDetailObj>{};
    this.entity.accGstDetails = <accGstDetailObj[]>[];
    this.entity.accLicenses = <accLicenseObj[]>[];
    this.entity.accBusinessLocations = <accBusinessLocationObj[]>[];
    this.entity.accPanDetail.currencyCode = "INR";
    this.entity.accPanDetail.creditLimit = 0;
    // this.pastentity=Object.assign({},this.entity);
  }
  edit() {
    //this.navactions.navaction("view");
    this.callbackedit();

  }
  getdata() {
    //console.log(index);
  }
  undo() {
    // this.entity =this.pastentity;
    // this.callbackedit();
    // this.entity = <AccountObj>{};
    // this.entity.accAddress = <accAddressObj>{};
    // this.entity.accBankDetail = <accBankDetailObj>{};
    // this.entity.accPanDetail = <accPanDetailObj>{};
    // this.entity.accGstDetails = <accGstDetailObj[]>[];
    // this.entity.accLicenses = <accLicenseObj[]>[];
    // this.entity.accBusinessLocations = <accBusinessLocationObj[]>[];
    // this.entity.accPanDetail.currencyCode = "INR";
    // this.entity.accPanDetail.creditLimit = 0;
  }
  Add() {
    // if (this.rowIndex == null) {
    //   this.entity.accBusinessLocations.push(this.acc.accBusinessLocations);
    // } else {
    //   this.entity.accBusinessLocations[this.rowIndex] = this.acc.accBusinessLocations;
    // }
    // this.acc.accBusinessLocations = <accBusinessLocationObj>{};
    // this.acc.accBusinessLocations.city = <cityObj>{};
    // this.rowIndex = null;
  }
  accBusinessLocations() {
    //this.reference.accBusinessLocations.cityName = index
  }
  editrow() {
    // this.rowIndex = this.entity.accBusinessLocations.indexOf(s);
    // this.acc.accBusinessLocations = Object.assign({}, s);
  }
  deleterow() {
    // var params = {
    //   dialog: 'confirm',
    //   title: "warning",
    //   message: "Do You Want Delete Row",
    // }
    // this.dialog.swal(params).then(data => {
    //   if (data == true) {
    //     this.param = this.entity.accBusinessLocations.indexOf(s);
    //     this.iConfirmFn2();
    //   }
    // })
  }
  iConfirmFn2() {
    // if (this.param != undefined) {
    //   this.entity.accBusinessLocations.splice(this.param, 1);
    //   var params = {
    //   }
    //   this.dialog.swal(params);
    // }
  }
  license() {
    // if (this.rowIndex == null) {
    //   this.entity.accLicenses.push(this.reference.accLicenses);
    // } else {

    //   this.entity.accLicenses[this.rowIndex] = this.reference.accLicenses;
    // }
    // this.reference.accLicenses = <accLicenseObj>{};
    // this.rowIndex = null;
  }
  licenseedit() {
    // this.rowIndex = this.entity.accLicenses.indexOf(s);
    // this.reference.accLicenses = Object.assign({}, s);
  }
  licensedelete() {
    // var params = {
    //   dialog: 'confirm',
    //   title: "warning",
    //   message: "Do You Want Delete Row",
    // }
    // this.dialog.swal(params).then(data => {
    //   if (data == true) {
    //     this.param = this.entity.accLicenses.indexOf(s);
    //     this.iConfirmFn3();
    //   }
    // })
  }
  iConfirmFn3() {
    // if (this.param != undefined) {
    //   this.entity.accLicenses.splice(this.param, 1);
    //   var params = {
    //   }
    //   this.dialog.swal(params);
    // }
  }

  closerdlc() {
    this.ngview = false;
  }
  
  // addgstTablerow() {

  //   this.gstininfo.gst_typ_name = this.reference.gstTypes.filter(f => f.cd == this.gstininfo.gstur)[0].nm;

  //   if (this.rowIndex == null) {

  //     this.entity.accGstDetails.push(this.gstininfo);
  //   }
  //   else {
  //     this.entity.accGstDetails[this.rowIndex] = this.gstininfo;
  //   }
  //   this.gstininfo = {};
  //   this.rowIndex = null;
  // }

  addgstTablerow() {
    // if (this.isGstinInvalid()) {
    //     //console.error("Invalid GSTIN. Row not added.");
    //     this.dialog.swal({ dialog: 'Warning', title: 'Warning', message: "Fill Valid GSTIN No." })
    //     return;
    // }
    // this.gstininfo.gst_typ_name = this.reference.gstTypes.find(f => f.cd === this.gstininfo.gstur)?.nm;

    // if (this.rowIndex == null) {

    //     this.entity.accGstDetails.push(this.gstininfo);
    // } else {
    //     this.entity.accGstDetails[this.rowIndex] = this.gstininfo;
    // }

    // this.gstininfo = {};
    // this.rowIndex = null;
}

  editgstTablerow() {
    // this.rowIndex = index;
    // this.gstininfo = Object.assign({}, obj);
  }
  deletegstTablerow() {

    var params = {

      dialog: 'confirm',
      title: "warning",
      message: "Do you want to delete record"
    }
    // this.dialog.swal(params).then(data => {
    //   if (data == true) {
    //     // this.param = this.entity.firmLics;
    //     this.entity.accGstDetails.splice(index, 1);
    //   }
    // })
  }
}
