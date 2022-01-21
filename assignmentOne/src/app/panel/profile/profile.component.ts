import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from '../../services/toaster/toaster.service';
import { CommonService } from '../../services/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;
  userid: any;
  constructor(private modalService: NgbModal, private spinnerService: NgxSpinnerService, private toasterService: ToasterService, private commonService: CommonService) { }

  userProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.spinnerService.show();
    this.commonService.userProfile(localStorage.getItem("id")).subscribe((result: any) => {
      this.spinnerService.hide();
      if (result.status == true) {
        this.userData = result.items;
      } else {
        this.toasterService.showError(result["message"], "Sorry!")
      }
    })
  }

  get userProfileControll() {
    return this.userProfileForm.controls;
  }

  onSubmitProfileForm() {
    this.userid = localStorage.getItem('id')
    this.spinnerService.show();
    this.commonService.updateProfile(this.userProfileForm.value, this.userid).subscribe((result: any) => {

      this.spinnerService.hide();

      if (result.subCode == 200) {
        this.toasterService.showSuccess(result.message, "Profile Updated Successfully")
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        this.toasterService.showError(result.message, "Sorry!")
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    })
  }

  open(content: any, data: any) {
    this.userData = data;
    this.userProfileForm = new FormGroup({
      firstName: new FormControl(this.userData.firstName, Validators.required),
      lastName: new FormControl(this.userData.lastName, Validators.required),
      gender: new FormControl(this.userData.gender, Validators.required),
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
