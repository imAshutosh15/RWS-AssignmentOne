import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../services/toaster/toaster.service';
import { CommonService } from '../../services/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData : any;

  constructor(private spinnerService: NgxSpinnerService, private toasterService: ToasterService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.userProfile(localStorage.getItem("id")).subscribe((result: any) => {
      this.spinnerService.hide();
      if (result.status == true) {        
        this.userData = result.items;
      }else{
        this.toasterService.showError(result["message"], "Sorry!")
      }
    })
  }

}
