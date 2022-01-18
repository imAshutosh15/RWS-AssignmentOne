import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignmentOne';
  loggedIn: boolean = false;

  constructor(private router: Router){

  }

  ngOnInit(): void {
    if (localStorage.getItem("isLoggedIn")) {
      this.loggedIn = true;
      this.router.navigate(['/main/dashboard'])
    }    
  }
}
