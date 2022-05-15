import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { SidebarComponentComponent } from './components/sidebar/sidebar-component/sidebar-component.component';
import { SidebarToggleComponent } from './components/sidebar/sidebar-toggle/sidebar-toggle.component';
import { TimetableTableComponent } from './components/timetable/timetable-table/timetable-table.component';
import { SettingsScreenComponent } from './components/settings/settings-screen/settings-screen.component';
import { HeadingComponentComponent } from './components/heading-component/heading-component.component';
import { NewFileComponent } from './components/settings/new-file/new-file.component';
import { NewsScreenComponent } from './components/news/news-screen/news-screen.component';

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
    NewsScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
