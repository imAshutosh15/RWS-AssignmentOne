import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) {
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/main/dashboard'])
    } else {
      this.router.navigate(['/login'])
    }
   }

  ngOnInit(): void {
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/main/dashboard'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get loginControll() {
    return this.loginForm.controls;
  }
  onSubmitLoginForm() {
    console.warn(this.loginForm.value);
    localStorage.setItem('isLoggedIn', "true");      
    setTimeout(() => {
      window.location.reload();
    }, 100);
        this.router.navigate(['/']);
  }

}
