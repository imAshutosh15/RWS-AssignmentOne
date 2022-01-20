import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../services/toaster/toaster.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  message!: string;
  usersList: any;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  constructor(private spinnerService: NgxSpinnerService, private toasterService: ToasterService, private commonService: CommonService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.commonService.usersList().subscribe((result: any) => {
      this.spinnerService.hide();
      if (result["status"] == true) {
        console.log(result);
        
        this.usersList = result.items;
        this.count = result.items.length;
      }else{
        this.toasterService.showError(result["message"], "Sorry!")
      }
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.ngOnInit();
  }

}
