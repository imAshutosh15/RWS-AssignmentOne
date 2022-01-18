import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navbarCollapsed: boolean = false; 

  constructor(private router : Router) {
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/main/dashboard'])
    } else {
      this.router.navigate(['/'])
    }
   }

  ngOnInit(): void {
  }

  toggle(){
      this.navbarCollapsed = !this.navbarCollapsed;
  }

}
