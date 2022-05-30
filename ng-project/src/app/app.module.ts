import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { SidebarComponentComponent } from './components/ui-components/sidebar/sidebar-component/sidebar-component.component';
import { SidebarToggleComponent } from './components/ui-components/sidebar/sidebar-toggle/sidebar-toggle.component';
import { TimetableTableComponent } from './components/timetable/timetable-table/timetable-table.component';
import { SettingsScreenComponent } from './components/settings/settings-screen/settings-screen.component';
import { HeadingComponentComponent } from './components/ui-components/heading-component/heading-component.component';
import { NewFileComponent } from './components/settings/new-file/new-file.component';
import { NewsScreenComponent } from './components/news/news-screen/news-screen.component';
import { LoadingWheelComponent } from './components/ui-components/loading-wheel/loading-wheel.component';
import { IpChangerComponent } from './components/settings/ip-changer/ip-changer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SetupTimetableScreenComponent } from './components/setup-timetable/setup-timetable-screen/setup-timetable-screen.component';
import { TimetableDayComponent } from './components/timetable/timetable-day/timetable-day.component';
import { ToggleSwitchComponent } from './components/ui-components/toggle-switch/toggle-switch.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SidebarComponentComponent,
    SidebarToggleComponent,
    TimetableTableComponent,
    SettingsScreenComponent,
    HeadingComponentComponent,
    NewFileComponent,
    NewsScreenComponent,
    LoadingWheelComponent,
    IpChangerComponent,
    SetupTimetableScreenComponent,
    TimetableDayComponent,
    ToggleSwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
