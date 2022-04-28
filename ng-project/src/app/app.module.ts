import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { WelcomeComponent } from './components/home/welcome/welcome.component';
import { SidebarComponentComponent } from './components/sidebar/sidebar-component/sidebar-component.component';
import { SidebarToggleComponent } from './components/sidebar/sidebar-toggle/sidebar-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WelcomeComponent,
    SidebarComponentComponent,
    SidebarToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
