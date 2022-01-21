import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule ,  Routes} from "@angular/router";
import { AuthGuard } from '../gaurds/auth.guard';
import { UsersListComponent } from './users-list/users-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const panelRoutes  : Routes = [
  {
    path : "dashboard",
    component : DashboardComponent, canActivate : [AuthGuard]
  },
  {
    path : "profile",
    component : ProfileComponent, canActivate : [AuthGuard]
  },
  {
    path : "users-list",
    component : UsersListComponent, canActivate : [AuthGuard]
  }
]


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(panelRoutes),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PanelModule { }
