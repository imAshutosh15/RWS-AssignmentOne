import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule ,  Routes} from "@angular/router";
import { AuthGuard } from '../gaurds/auth.guard';


const panelRoutes  : Routes = [
  {
    path : "dashboard",
    component : DashboardComponent, canActivate : [AuthGuard]
  },
  {
    path : "profile",
    component : ProfileComponent, canActivate : [AuthGuard]
  }
]


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(panelRoutes)
  ]
})
export class PanelModule { }
