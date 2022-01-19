import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from "../../services/common/common.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService} from "../../services/toaster/toaster.service";
// import Validation from '../../utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router : Router, private commonService : CommonService , private toasterService : ToasterService , private spinnerService : NgxSpinnerService) { }

  ngOnInit(): void { 
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/main/dashboard'])
    } else {
      this.router.navigate(['/register'])
    }
  }

  registrationForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('',[ Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    sequrityQuestion: new FormControl('', Validators.required),
    answerForSequrity: new FormControl('',Validators.required),
  });

  get registrationControll() {
    return this.registrationForm.controls;
  }

  onSubmitRegistrationForm() {
    this.spinnerService.show();

    this.commonService.register(this.registrationForm.value).subscribe((result : any) => {
      
      this.spinnerService.hide();      
      
      if (result.subCode == 200) {
        // this.message = result["message"];
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('userType', "user");
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
    // this.router.navigate(['/dashboard'])
  }
}
