import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import Validation from '../../utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router : Router) { }

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
    console.warn(this.registrationForm.value);
    this.router.navigate(['/dashboard'])
  }
}
