import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from "../../services/common/common.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService} from "../../services/toaster/toaster.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private commonService : CommonService , private toasterService : ToasterService , private spinnerService : NgxSpinnerService) {
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/main/dashboard'])
    } else {
      this.router.navigate(['/login'])
    }
   }

  ngOnInit(): void {
    // if (localStorage.getItem("isLoggedIn")) {
    //   this.router.navigate(['/main/dashboard'])
    // } else {
    //   this.router.navigate(['/login'])
    // }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get loginControll() {
    return this.loginForm.controls;
  }
  onSubmitLoginForm() {
    // console.warn(this.loginForm.value);
    // localStorage.setItem('isLoggedIn', "true");
    // localStorage.setItem('userType', "user");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
    //     this.router.navigate(['/']);
    this.spinnerService.show();

    this.commonService.login(this.loginForm.value).subscribe((result : any) => {
      
      this.spinnerService.hide();      
      console.log(result);
      
      if (result.subCode == 200) {
        // this.message = result["message"];
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('userType',result.items.userType);
        this.toasterService.showSuccess(result.message, "Welcome to Dashboard")

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        this.router.navigate(['/main/dashboard'])
      } else{
        this.toasterService.showError(result.message, "Sorry!")
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } 
    })
  }

}
