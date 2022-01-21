import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toaster/toaster.service';
import { CommonService } from '../../services/common/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  get userProfileControll() {
    return this.userProfileForm.controls;
  }

  message!: string;
  userData: any;
  usersList: any;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  constructor(private modalService: NgbModal, private spinnerService: NgxSpinnerService, private toasterService: ToasterService, private commonService: CommonService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.commonService.usersList().subscribe((result: any) => {
      this.spinnerService.hide();
      if (result["status"] == true) {
        console.log(result);

        this.usersList = result.items;
        this.count = result.items.length;
      } else {
        this.toasterService.showError(result["message"], "Sorry!")
      }
    })
  }

  onSubmitProfileForm(userId: string) {
    // console.log(userId);
    
    this.spinnerService.show();
    

    this.commonService.updateProfile(this.userProfileForm.value, userId).subscribe((result: any) => {

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


  handlePageChange(event: number): void {
    this.page = event;
    this.ngOnInit();
  }

  open(content: any, data: any) {
    this.userData = data;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
