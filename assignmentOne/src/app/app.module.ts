import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { Routes , RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren : ()=> import('./entry/entry.module').then( entryModule=>entryModule.EntryModule)
  },
  {
    path: 'main',
    loadChildren : ()=> import('./panel/panel.module').then( panelModule=>panelModule.PanelModule)
  },
  {
    path: '**',
    loadChildren : ()=> import('./entry/entry.module').then( entryModule=>entryModule.EntryModule)
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
